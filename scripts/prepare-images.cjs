// Rebuild disposable web exports from the untouched image originals.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const { createImageCache } = require('./image-cache.cjs');

async function filesIn(directory, outputRoot) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    if (file === outputRoot) return [];
    return entry.isDirectory() ? filesIn(file, outputRoot) : /\.(png|jpe?g|webp)$/i.test(file) ? [file] : [];
  }));
  return groups.flat().sort();
}

async function prepareImages({
  root = path.resolve(__dirname, '..'),
  widths = [480, 640, 800, 960, 1200, 1600, 2400],
  cacheOrigin = process.env.SEANBETTS_IMAGE_CACHE === '0' ? null :
    (process.env.CF_PAGES === '1' || process.env.SEANBETTS_IMAGE_CACHE === '1') ? 'https://www.seanbetts.com' : null,
  fetchImpl = fetch,
} = {}) {
  const sourceRoot = path.join(root, 'public/images');
  const outputRoot = path.join(sourceRoot, 'responsive');
  const manifestFile = path.join(root, 'src/generated/images.json');
  const cache = createImageCache({ origin: cacheOrigin, fetchImpl });
  let generated = 0;
  await fs.mkdir(outputRoot, { recursive: true });
  const manifest = {};
  let originalBytes = 0, exportedBytes = 0;
  const files = await filesIn(sourceRoot, outputRoot);
  let prepared = 0;
  for (const file of files) {
    const buffer = await fs.readFile(file);
    const metadata = await sharp(buffer).metadata();
    // Do not flatten animated artwork.
    if (metadata.pages > 1) continue;
    const rotated = [5, 6, 7, 8].includes(metadata.orientation);
    const width = rotated ? metadata.height : metadata.width;
    const height = rotated ? metadata.width : metadata.height;
    const hash = crypto.createHash('sha256').update(buffer).update('webp-q80-v2').digest('hex').slice(0, 16);
    const targetWidths = [...new Set(widths.map(w => Math.min(w, width)))];
    const source = '/images/' + path.relative(sourceRoot, file).split(path.sep).join('/');
    const avifHash = source.startsWith('/images/game/') ?
      crypto.createHash('sha256').update(buffer).update('avif-q60-e4-v1').digest('hex').slice(0, 16) : null;
    await cache.restore([
      ...targetWidths.map(w => ({ name: `${hash}-${w}.webp`, format: 'webp', width: w })),
      ...(avifHash ? targetWidths.map(w => ({ name: `${avifHash}-${w}.avif`, format: 'avif', width: w })) : []),
    ].map(candidate => ({ ...candidate, output: path.join(outputRoot, candidate.name), height: Math.round(height * candidate.width / width) })));
    const variants = [];
    for (const targetWidth of targetWidths) {
      const name = `${hash}-${targetWidth}.webp`;
      const output = path.join(outputRoot, name);
      try { await fs.access(output); } catch {
        await sharp(buffer).rotate().resize({ width: targetWidth, withoutEnlargement: true })
          .webp({ quality: 80, effort: 5 }).toFile(output);
        generated++;
      }
      variants.push({ src: `/images/responsive/${name}`, width: targetWidth });
    }
    // AVIF supplements the illustrated artwork; photographs and screenshots keep WebP.
    const avif = [];
    if (avifHash) {
      // Effort 4 keeps cold builds practical on the Pages build runner.
      for (const targetWidth of targetWidths) {
        const name = `${avifHash}-${targetWidth}.avif`;
        const output = path.join(outputRoot, name);
        try { await fs.access(output); } catch {
          await sharp(buffer).rotate().resize({ width: targetWidth, withoutEnlargement: true })
            .avif({ quality: 60, effort: 4 }).toFile(output);
          generated++;
        }
        avif.push({ src: `/images/responsive/${name}`, width: targetWidth });
      }
    }
    // Keep the cached AVIF exports, but prefer WebP when it is smaller overall.
    const bytesFor = async candidates => (await Promise.all(candidates.map(candidate =>
      fs.stat(path.join(root, 'public', candidate.src)).then(stat => stat.size)))).reduce((sum, bytes) => sum + bytes, 0);
    const preferWebp = avif.length && await bytesFor(avif) >= await bytesFor(variants);
    manifest[source] = { width, height, variants, ...(avif.length ? { avif, preferWebp: Boolean(preferWebp) } : {}) };
    originalBytes += buffer.length;
    exportedBytes += (await fs.stat(path.join(root, 'public', variants.at(-1).src))).size;
    console.log(`Prepared ${++prepared}/${files.length}: ${source}`);
  }
  await fs.mkdir(path.dirname(manifestFile), { recursive: true });
  const json = JSON.stringify(manifest, null, 2) + '\n';
  if (await fs.readFile(manifestFile, 'utf8').catch(() => '') !== json) await fs.writeFile(manifestFile, json);
  const currentFiles = new Set(Object.values(manifest).flatMap(image => [...image.variants, ...(image.avif || [])].map(variant => path.basename(variant.src))));
  for (const name of await fs.readdir(outputRoot)) {
    if (!currentFiles.has(name) && /^[a-f0-9]{16}-\d+\.(?:webp|avif)$/.test(name)) await fs.unlink(path.join(outputRoot, name));
  }
  console.log(`Prepared ${Object.keys(manifest).length} responsive images. Originals ${(originalBytes / 1e6).toFixed(1)} MB; largest WebP variants ${(exportedBytes / 1e6).toFixed(1)} MB.`);
  console.log(`Image exports: ${cache.restored} restored from production, ${generated} encoded; remaining exports reused locally.`);
  return { restored: cache.restored, generated };
}
if (require.main === module) prepareImages().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { prepareImages };
