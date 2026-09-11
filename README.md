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

### The Blueprint

Occasional thought leadership and opinions on AI developments, product shifts, and the broader implications of generative AI.

- ✍️ Writing on AI, technology, and industry change
- 🔎 Analysis of new models, tools, and platform moves
- 🧭 Commentary on how AI is reshaping products and knowledge work

[View Project](https://www.the-blueprint.ai)

### GenAI Timeline

An interactive timeline tracking key milestones and developments across the history of generative AI.

- 📅 Major events and releases across the AI landscape
- 🔍 Searchable exploration of how the field has evolved
- 🔗 Context and references for deeper research

[View Project](https://timeline.the-blueprint.ai)

## 📫 Get in Touch

- LinkedIn: [linkedin.com/in/seanbetts](https://www.linkedin.com/in/seanbetts)
- Website: [seanbetts.com](https://www.seanbetts.com)
- Newsletter: [The Blueprint](https://www.the-blueprint.ai)
- GitHub: [github.com/seanbetts](https://github.com/seanbetts)
- Bluesky: [bsky.app/profile/seanbetts.com](https://bsky.app/profile/seanbetts.com)

For speaking, AI and collaboration enquiries, [contact me on LinkedIn](https://www.linkedin.com/in/seanbetts/).

---

"The future is already here – it's just not evenly distributed." - William Gibson

## Development

The site uses React and React Router, with prerendered HTML and responsive image exports. The production build is prepared for Cloudflare Pages.

```sh
npm ci
npm start
```

To run the tests and validate the production output:

```sh
node --test scripts/tests/*.test.cjs
npm test
npm run build
```

The build generates `build/` and checks the exported pages and images. A local build does not deploy the site.

See the [development guide](docs/development.md) for code structure and content conventions, the [responsive image guide](docs/responsive-images.md) for image handling, and the [search and AI discovery notes](docs/search-and-ai.md) for publishing checks.
