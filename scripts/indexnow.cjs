// Runs after deployment, never inside the website or the build. No npm dependencies.
const fs = require('node:fs/promises');
const path = require('node:path');
const { parseArgs } = require('node:util');
const ORIGIN = 'https://www.seanbetts.com';
const REPOSITORY = 'seanbetts/seanbetts';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function validateManifest(manifest) {
  if (manifest?.version !== 1 || manifest.host !== new URL(ORIGIN).host || !/^[a-f0-9]{40}$/.test(manifest.revision || '') ||
      !manifest.pages || Array.isArray(manifest.pages) || typeof manifest.pages !== 'object') throw new Error('Invalid IndexNow manifest');
  const entries = Object.entries(manifest.pages);
  if (!entries.length || entries.length > 10000) throw new Error('Invalid IndexNow page count');
  for (const [url, hash] of entries) {
    const parsed = new URL(url);
    if (parsed.origin !== ORIGIN || parsed.href !== url || parsed.search || parsed.hash || !parsed.pathname.endsWith('/') ||
        !/^[a-f0-9]{64}$/.test(hash)) throw new Error(`Invalid IndexNow page: ${url}`);
  }
  return manifest;
}

function changedUrls(current, previous) {
  validateManifest(current);
  if (previous) validateManifest(previous);
  const before = previous?.pages || {};
  const urls = [...new Set([...Object.keys(current.pages), ...Object.keys(before)])]
    .filter(url => current.pages[url] !== before[url]).sort();
  if (urls.length > 10000) throw new Error('IndexNow change set exceeds one batch');
  return urls;
}

async function notifyDeployment({ revision, key, token, previous, submit = false, fetchImpl = fetch, sleep = delay, attempts = 60, log = () => {} }) {
  if (!/^[a-f0-9]{40}$/.test(revision || '') || !/^[a-zA-Z0-9-]{8,128}$/.test(key || '') || !token) throw new Error('Revision, public IndexNow key and GitHub token are required');
  const request = (url, options = {}) => fetchImpl(url, { signal: AbortSignal.timeout(15000), redirect: 'error', ...options });
  const github = async endpoint => {
    const response = await request(`https://api.github.com/repos/${REPOSITORY}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'seanbetts-indexnow' },
    });
    if (!response.ok) throw new Error(`GitHub check failed: HTTP ${response.status}`);
    return response.json();
  };
  // Pages publishes no check run when a commit explicitly skips deployment.
  // Read the exact revision's message so automatic and manual runs agree.
  const commit = await github(`/commits/${revision}`);
  if (commit.sha !== revision || typeof commit.commit?.message !== 'string') throw new Error('Invalid commit evidence for deployment skip detection');
  if (/^\[(?:CF-Pages-Skip|CI[ -]Skip|Skip[ -]CI)\]/i.test(commit.commit.message)) {
    return { status: 'deployment-skipped', urls: [] };
  }
  const isCurrent = async () => (await github('/git/ref/heads/main')).object.sha === revision;
  let current;
  for (let attempt = 0; attempt < attempts; attempt++) {
    if (!await isCurrent()) return { status: 'superseded', urls: [] };
    const { check_runs: checks } = await github(`/commits/${revision}/check-runs?per_page=100`);
    const required = [['Cloudflare Pages', 85455], ['Validate site', 15368]].map(([name, app]) =>
      checks.find(check => check.name === name && check.app?.id === app && check.head_sha === revision));
    if (required.some(check => check?.status === 'completed' && check.conclusion !== 'success')) throw new Error('Production deployment or validation failed');
    if (required.every(check => check?.status === 'completed' && check.conclusion === 'success')) {
      const response = await request(`${ORIGIN}/indexnow-manifest.json`, { headers: { 'Cache-Control': 'no-cache' } });
      if (response.ok) {
        const candidate = validateManifest(await response.json());
        if (candidate.revision === revision) { current = candidate; break; }
      } else if (response.status !== 404) throw new Error(`Live manifest fetch failed: HTTP ${response.status}`);
    }
    if (attempt + 1 < attempts) { log('Waiting for validated production deployment and matching live manifest.'); await sleep(30000); }
  }
  if (!current) throw new Error('Timed out waiting for the production revision to be live');
  const keyLocation = `${ORIGIN}/indexnow-key.txt`;
  const response = await request(keyLocation, { headers: { 'Cache-Control': 'no-cache' } });
  if (!response.ok || (await response.text()).trim() !== key) throw new Error('Live IndexNow key verification failed');
  const urls = changedUrls(current, previous);
  if (!await isCurrent()) return { status: 'superseded', urls: [] };
  if (!submit) return { status: 'dry-run', urls };
  if (!urls.length) return { status: 'unchanged', urls, state: current };
  const result = await request(ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: current.host, key, keyLocation, urlList: urls }),
  });
  // Do not advance the baseline on errors: rerunning retries the same outstanding changes.
  if (![200, 202].includes(result.status)) throw new Error(`IndexNow submission failed: HTTP ${result.status}`);
  return { status: result.status === 200 ? 'accepted' : 'pending-verification', urls, state: current };
}

async function main() {
  const { values } = parseArgs({ options: { revision: { type: 'string' }, state: { type: 'string', default: '.indexnow/state.json' }, submit: { type: 'boolean', default: false } } });
  let previous;
  try { previous = JSON.parse(await fs.readFile(values.state, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const key = (await fs.readFile(path.join(__dirname, '../public/indexnow-key.txt'), 'utf8')).trim();
  const result = await notifyDeployment({ revision: values.revision, key, previous, submit: values.submit, token: process.env.GITHUB_TOKEN, log: console.log });
  console.log(JSON.stringify({ status: result.status, urls: result.urls }, null, 2));
  if (result.state) {
    await fs.mkdir(path.dirname(values.state), { recursive: true });
    await fs.writeFile(`${values.state}.tmp`, JSON.stringify(result.state, null, 2) + '\n');
    await fs.rename(`${values.state}.tmp`, values.state);
  }
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `save_state=${Boolean(result.state)}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,
    `IndexNow: **${result.status}**. ${result.urls.length} URL(s). Acceptance is not a guarantee of indexing.\n\n${result.urls.map(url => `- ${url}`).join('\n')}\n`);
}

module.exports = { ORIGIN, validateManifest, changedUrls, notifyDeployment };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
