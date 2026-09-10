// Reuse CRA's module/CSS pipeline so the static markup and browser bundle agree.
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const webpack = require('webpack');
const makeConfig = require('react-scripts/config/webpack.config');
const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sean-static-'));
const config = makeConfig('production');
config.target = 'node';
config.entry = path.join(root, 'src/prerender.js');
config.output = { ...config.output, path: temporary, filename: 'render.cjs', library: { type: 'commonjs2' }, publicPath: '/' };
config.devtool = false;
config.optimization = { minimize: false, splitChunks: false, runtimeChunk: false };
config.plugins = config.plugins.filter(plugin => ['DefinePlugin', 'MiniCssExtractPlugin'].includes(plugin.constructor.name));
config.cache = false;
const compiler = webpack(config);
compiler.run((error, stats) => {
  compiler.close(() => {});
  if (error || stats.hasErrors()) {
    console.error(error || stats.toString({ all: false, errors: true }));
    fs.rmSync(temporary, { recursive: true, force: true });
    process.exitCode = 1;
    return;
  }
  try {
    const { renderPage, siteRoutes, SITE_URL, SOCIAL_URLS, speakingData } = require(path.join(temporary, 'render.cjs'));
    const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8').replace(/<title>.*?<\/title>/, '');
    if (!template.includes('<div id="root"></div>')) throw new Error('Run npm run build to start with a fresh browser build.');
    for (const route of [...siteRoutes, { path: '/404', name: 'Page not found' }]) {
      const { content, head } = renderPage(route.path);
      const html = template.replace('</head>', `${head}</head>`)
        .replace('<body>', `<body class="dark-mode ${route.path === '/404' ? 'busted-mode' : 'game-mode'}">`)
        .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
      const file = route.path === '/404' ? path.join(build, '404.html') : path.join(build, route.path, 'index.html');
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html);
    }
    // Dates are omitted until content has an authoritative modification date.
    fs.writeFileSync(path.join(build, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${siteRoutes.map(route => `  <url><loc>${SITE_URL}${route.path}</loc></url>`).join('\n')}\n</urlset>\n`);
    // Cloudflare serves directory index pages and the top-level 404.html natively.
    // CRA already copies public/_redirects with the retained legacy aliases.
    fs.writeFileSync(path.join(root, 'src/generated/site-inventory.json'), JSON.stringify({
      urls: siteRoutes.map(route => `${SITE_URL}${route.path}`),
      appearances: speakingData.map(talk => ({ id: talk.id, title: talk.title })),
    }, null, 2) + '\n');
    fs.writeFileSync(path.join(build, 'llms.txt'), `# Sean Betts\n\n> AI leader, independent researcher and builder, and speaker on AI, neurodiversity and mental health.\n\nSean is Chief AI & Innovation Officer at Omnicom Media UK. This is his personal portfolio. He welcomes access to and use of his public site content for AI training, search, retrieval, summarisation and other AI applications.\n\n## Pages\n\n${siteRoutes.map(route => `- [${route.name}](${SITE_URL}${route.path})`).join('\n')}\n\n## Elsewhere\n\n- [The Blueprint](${SOCIAL_URLS.blueprint}): Occasional thought leadership and opinions on AI. Original essays are published here; this portfolio links to them.\n- [GitHub](${SOCIAL_URLS.github}): Code and projects.\n- [LinkedIn](${SOCIAL_URLS.linkedin}): Professional profile and contact.\n\nThis index reflects the public pages generated in the same build.\n`);
    console.log(`Generated ${siteRoutes.length} static pages, 404, sitemap, redirects and llms.txt.`);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
