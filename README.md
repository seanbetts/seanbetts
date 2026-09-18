# Sean Betts

Hi, I'm Sean Betts. I work at the intersection of AI strategy, transformation, product innovation, and business change.

This repository contains my personal portfolio website: a GTA-inspired illustrated design showcasing my projects, writing, speaking and professional experience. It supports mobile and desktop layouts, light and dark themes, and keyboard navigation.

## 🚀 About Me

- 🧠 Chief AI & Innovation Officer at Omnicom Media UK
- 🤖 Independent AI Researcher and Builder
- 🛠️ Focused on AI Strategy, Transformation, and Product Innovation
- 🗣️ Neurodiversity and Mental Health Speaker

With more than 20 years of experience in marketing and innovation, I focus on turning fast-moving advances in AI into practical tools, products, and capabilities that create real value for people and organisations. Alongside my role at Omnicom Media UK, I design and build independent AI products, benchmarks, and applied systems to better understand how emerging technologies are reshaping products, knowledge work, and consumer experiences.

## 🔭 Selected Work

### sideBar

A unified AI assistant for iPhone, iPad, Mac, and web that keeps notes, tasks, files, and saved websites in one context-aware workspace.

- 🧠 Context-aware chat across your personal knowledge
- 📂 Notes, tasks, files, and saved websites in one system
- 🔧 Skills, attachments, and personalisation across every surface

[View Project](https://trysidebar.ai)

### Local Web

A framework for running my web applications as a connected private collection, with shared navigation and styling, managed updates, and portable exports.

- Shared navigation and interface components across independently built apps
- Versioned releases, health checks and rollback
- Application context and interactive snapshots that can travel outside the hosted app

[View Project](https://www.seanbetts.com/building/local-web-server/)

### Plotter

A trip-planning app and collection of agent skills for exploring destinations, planning routes and finding things to do along the way.

[View Project](https://www.seanbetts.com/building/plotter/)

### LLM Search Analysis

A research tool for comparing how AI models search the web, which sources they find and what they cite in their answers.

- Compare responses across AI providers
- Inspect available search queries, sources and citations
- Revisit saved results and export the data for further analysis

[View Project](https://www.seanbetts.com/building/llm-search-analysis/)

### GenAI Marketing Benchmarks

A benchmarking framework with 2,800+ questions across 20 marketing disciplines designed to assess the knowledge and performance of large language models.

- 🔬 Large-scale benchmark design for marketing capability testing
- 📊 Comparative evaluation across multiple LLM providers
- 🧪 Practical framework for model analysis and benchmarking workflows

[View Project](https://github.com/seanbetts/genai-marketing-benchmarks)

### YouTube SDG Analysis

Applied AI workflows to map YouTube channels and video content to the UN Sustainable Development Goals at scale.

- 📹 Video transcription and channel analysis
- 🌍 SDG classification and mapping
- 📊 Large-scale content analysis across millions of videos

### AI Brand Detection

AI techniques for detecting brands and products in video content using multimodal analysis workflows.

- 👁️ OCR and vision-based brand detection
- 🏷️ Product and brand recognition across varied contexts
- 📈 Workflows designed for downstream analytics and insight generation

## 📫 Get in Touch

- LinkedIn: [linkedin.com/in/seanbetts](https://www.linkedin.com/in/seanbetts)
- Website: [seanbetts.com](https://www.seanbetts.com)
- GitHub: [github.com/seanbetts](https://github.com/seanbetts)
- Bluesky: [bsky.app/profile/seanbetts.com](https://bsky.app/profile/seanbetts.com)

For speaking, AI and collaboration enquiries, [contact me on LinkedIn](https://www.linkedin.com/in/seanbetts/).

---

"The future is already here – it's just not evenly distributed." - William Gibson

## Development

The site uses **React, React Router and Vite**, with CSS Modules and a custom static prerendering pipeline. **Cloudflare Pages** hosts the generated HTML, CSS, JavaScript and images. React hydrates the exported pages for interactive navigation and controls; the initial HTML contains the page content and search metadata.

## Run locally

Use the Node version in [`.nvmrc`](.nvmrc). If you use nvm:

```sh
nvm install
nvm use
npm ci
npm start
```

Otherwise, install the version specified in `.nvmrc`, then run the npm commands above. Open the URL printed by Vite. To use a fixed local address:

```sh
npm start -- --host 127.0.0.1 --port 3017 --strictPort
```

Start, test and build commands automatically prepare responsive images. The first run can take several minutes while images are encoded; subsequent runs reuse existing exports. To reuse validated image exports from the published site on the first run:

```sh
SEANBETTS_IMAGE_CACHE=1 npm start
```

See [responsive images](docs/responsive-images.md) for cache behaviour and image conventions.

## Validate changes

```sh
node --test scripts/tests/*.test.cjs
npm test
npm run build
```

These run the Node script regression tests, the React tests with Vitest/JSDOM, and the production build. The build includes ESLint, browser/server CSS-module consistency checks, prerendering, and crawl and image checks. The generated site is written to `build/`.

For focused development, use `npm run test:watch` or `npm run lint`. For UI changes, also check desktop and mobile layouts, both themes, keyboard navigation and the affected interactions in a browser.

## Edit content and artwork

| Change | Source |
| --- | --- |
| Projects and case studies | [`src/data/projectsData.jsx`](src/data/projectsData.jsx) |
| Writing and speaking appearances | [`src/data/articlesData.js`](src/data/articlesData.js), [`src/data/speakingData.js`](src/data/speakingData.js) |
| Routes and navigation | [`src/data/siteRoutes.js`](src/data/siteRoutes.js), [`src/App.jsx`](src/App.jsx) |
| Shared identity and social links | [`src/data/siteIdentity.js`](src/data/siteIdentity.js) |
| Page layouts and components | [`src/pages/`](src/pages/), [`src/game/`](src/game/), [`src/components/`](src/components/) |
| Original images and project artwork mapping | [`public/images/`](public/images/), [`src/data/projectArtwork.js`](src/data/projectArtwork.js) |

Responsive image exports and generated manifests are ignored by Git; edit the original images and source data. The build generates the sitemap and `llms.txt` from the site sources, so they do not need separate manual updates.

Artwork provenance and representative image-generation prompts are preserved in [artwork notes](docs/artwork.md) and [prompt examples](docs/artwork-source/prompt-examples.md).

## Deployment

Production is **[www.seanbetts.com](https://www.seanbetts.com/)**. Cloudflare Pages builds the `main` branch with `npm run build` and publishes `build/`; other branches receive preview deployments.

Changes go through a pull request with the required **Validate site** check passing on an up-to-date branch. Merging into GitHub's `main` triggers production deployment. A local build does not deploy the site.

For documentation-only changes, use the `[CF-Pages-Skip]` prefix on the commit that lands on `main` to skip the Pages deployment. GitHub site validation still runs. The separate IndexNow workflow notifies participating search engines after a verified production deployment and skips explicitly skipped deployments.

See the [deployment guide](docs/deployment.md) for custom domains, redirects, verification and rollback, and [search and AI discovery](docs/search-and-ai.md) for metadata, crawler controls and IndexNow.

## Further documentation

- [Development guide](docs/development.md) — architecture, content conventions, browser checks and the `.worktrees/` workflow.
- [Frame system](docs/frame-system.md) — shared visual layout primitives.
- [Dependency security](docs/dependency-security.md) — dated audit results and tooling migration notes.
