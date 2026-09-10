import { Video, Ruler, Clock, ChatCircleDots, Globe, MagnifyingGlass, Brain, GameController, BookOpen, SquaresFour } from "@phosphor-icons/react";

const projectsData = [
  {
    id: "sidebar",
    name: "sideBar",
    description:
      "A unified AI assistant for iPhone, iPad, Mac, and web that keeps your notes, tasks, files, and saved websites in one context-aware workspace, with chat, skills, and personalization woven throughout every surface.",
    icon: <Brain size={48} />,
    url: "https://trysidebar.ai",
    type: "cross-platform app",
    date: "December 2025–present",
    technologies: ["SvelteKit", "FastAPI", "TypeScript", "Python", "Supabase"],
    features: [
      "Streaming chat that surfaces skills, attachments, and the context from recent notes, tasks, and files.",
      "Notes + tasks + projects that stay in sync with skills so sideBar can organise, search, and act on your content.",
      "Websites + files ingestion with pinning, archiving, and indexed retrieval so saved pages and uploads are instantly available in conversation.",
      "Skills system (required, standard, and installable store skills) that lets sideBar chain capabilities automatically while keeping availability visible in Settings."
    ],
    challenges:
      "Giving the assistant seamless access to everything you’ve created while honoring real-time sync, soft deletes, and your encrypted API keys across iPhone, iPad, Mac, and the browser.",
    learnings: "Bringing all your context into one place is valuable, but it can also create another walled garden. If that context cannot travel with you into the other tools you use, its usefulness is limited. Building sideBar has made me think as much about how context moves between products as how it is collected within one.",
    status: "Active",
    heroImage: "/images/projects/sidebar-welcome-ipad.png"
  },
  {
    id: "pointilism",
    name: "Pointilism",
    description: "A calm, monochrome surface to explore. Dots drift, breathe, snap, and drop to reveal different states—always readable, always minimal.",
    icon: <MagnifyingGlass size={48} />,
    url: "https://pointilism.seanbetts.com",
    type: "website",
    date: "December 2025",
    technologies: ["HTML", "CSS", "Vanilla JavaScript", "Canvas 2D"],
    features: [
      "Monochrome dot-field with light/dark mode",
      "Presets + mobile-friendly controls panel",
      "Breathing + grid snap + gravity drop interactions",
      "Freeze and export the dot field as a PNG"
    ],
    challenges: "Balancing a strict no-overlap layout with fluid motion and interactions across devices, while keeping the UI readable over a dynamic canvas layer.",
    learnings: "Beautiful design does not always translate into practical UX. An interface can be visually compelling and enjoyable to explore while still making everyday tasks harder than they need to be. Pointilism gave me room to explore that tension between an interesting visual idea and something people would want to use repeatedly.",
    status: "Completed",
    heroImage: "/images/projects/pointilism-hero.png"
  },
  {
    id: "llm-search-analysis",
    name: "LLM Search Analysis",
    description: "A comparative analysis tool for evaluating web search capabilities across OpenAI, Google Gemini, and Anthropic Claude models with interactive testing and batch analysis.",
    icon: <MagnifyingGlass size={48} />,
    url: "https://github.com/seanbetts/llm-search-analysis",
    type: "github",
    date: "November 2025",
    technologies: [
      "Python",
      "Streamlit",
      "SQLite",
      "SQLAlchemy",
      "OpenAI API",
      "Google AI API",
      "Anthropic API",
      "pandas"
    ],
    features: [
      "Multi-provider support (OpenAI, Google Gemini, Anthropic Claude)",
      "9 AI models with web search capabilities",
      "3-tab interface (Interactive, Batch Analysis, Query History)",
      "Database integration with full interaction persistence",
      "Rank tracking for search result citations",
      "CSV export for batch analysis results",
      "Real-time search query and source analysis"
    ],
    challenges: "Integrating three different provider APIs with varying search implementations, implementing accurate rank tracking for cited sources, and creating a unified interface for comparing search behaviors across models.",
    learnings: "ChatGPT searches and uses search results very differently from a human. It is tempting to understand AI search through familiar ideas about queries, rankings and clicks, but that only tells part of the story. This project changed how I think about what it means for information to be found and used by an AI assistant.",
    status: "Completed",
  },
  {
    id: "genai-explorer",
    name: "Generative AI Explorer",
    description: "An interactive web application that visualizes the landscape of generative AI companies, models, benchmarks, and capabilities.",
    icon: <Globe size={48} />,
    url: "https://explorer.the-blueprint.ai/",
    type: "website",
    date: "May 2025–present",
    technologies: [
      "React 19",
      "Next.js 15.3",
      "TypeScript",
      "Tailwind CSS"
    ],
    features: [
      "Model explorer by category",
      "Benchmark comparisons",
      "Rich media galleries",
      "Company profiles",
      "Model comparison tool"
    ],
    challenges: "Creating a structured data model to represent the complex AI ecosystem and enabling meaningful comparisons across diverse model types.",
    learnings: "The GenAI landscape is already incredibly complex, and fitting it into a coherent marketplace structure is much harder than it first appears. Companies, models, products and capabilities overlap, while the categories themselves keep changing. Deciding how to organise the landscape became as much of the work as building the interface to explore it.",
    status: "Active",
  },
  {
    id: "steam-hardware-watch",
    name: "Steam Hardware Watch",
    description: "An agent-driven monitoring toolkit that tracks Valve hardware launch signals, compares evidence across sources and turns changes into readable reports.",
    icon: <GameController size={48} />,
    url: "https://github.com/seanbetts/steam-hardware-watch",
    type: "github",
    date: "April–July 2026",
    technologies: ["Python", "Shell", "Node.js", "SteamKit", "Playwright"],
    features: [
      "Checks Komodo, SteamDB, SteamTracking and Valve endpoints for hardware signals",
      "Saves source snapshots and compares each run with the previous one",
      "Produces evidence summaries and human-readable status reports",
      "Tracks discovered, retrieved and blocked visual assets separately"
    ],
    challenges: "Reconciling incomplete signals across multiple sources, handling browser-dependent access and distinguishing meaningful changes from routine metadata updates.",
    learnings: "The more people discover loopholes in digital systems, the more likely those gaps are to be closed. Komodo eventually shut off the backend access this project had been using. It was a practical reminder that a useful discovery can be temporary, and that tools built around that access need to account for its disappearance.",
    status: "Completed"
  },
  {
    id: "apple-hig-mirror",
    name: "Apple HIG Mirror",
    description: "A developer tool that turns Apple's browser-rendered Human Interface Guidelines into structured Markdown, with repeatable extraction, verification and scheduled updates.",
    icon: <BookOpen size={48} />,
    url: "https://github.com/seanbetts/Apple-HIG",
    type: "github",
    date: "March 2026",
    technologies: ["TypeScript", "Node.js", "Playwright", "Markdown", "GitHub Actions"],
    features: [
      "Discovers guideline pages and extracts their rendered content",
      "Normalises content into deterministic Markdown and frontmatter",
      "Rewrites internal links and generates a Mintlify preview configuration",
      "Verifies generated output and schedules incremental updates through GitHub Actions"
    ],
    challenges: "Extracting consistent content from a dynamic documentation site while preserving structure, keeping internal links useful and avoiding unnecessary changes in generated files.",
    learnings: "AI agents have become much better at retrieving context directly from live websites, and much better versed in Swift and Apple’s developer ecosystem. That changes the value of maintaining a separate documentation mirror. A useful lesson here is to keep reassessing the workarounds I build as the underlying capabilities improve.",
    status: "Completed"
  },
  {
    id: "pixel-loader-lab",
    name: "Pixel Loader Lab",
    description: "A small creative coding sandbox for turning an app icon into a pixelated animated loader, with a live preview and optimised GIF export.",
    icon: <SquaresFour size={48} />,
    url: "https://github.com/seanbetts/pixel-loader-lab",
    type: "github",
    date: "February 2026",
    technologies: ["JavaScript", "CSS", "Vite", "Node.js", "ffmpeg", "gifsicle"],
    features: [
      "Builds a pixelated loader from a source app icon",
      "Provides a browser preview for iterating on the animation",
      "Exports optimised GIFs for use in other apps",
      "Reports image dimensions and file sizes"
    ],
    challenges: "Keeping the source icon recognisable through pixelation and animation, while balancing crisp rendering with a compact exported file.",
    learnings: "It is fun creating loading animations and animated logos. There is a lot of room for character in a small visual detail, and experimenting with movement can be rewarding in its own right. This was a reminder to leave space for playful projects alongside the more practical ones.",
    status: "Completed"
  },
  {
    id: "cains-jawbone",
    name: "Cain’s Jawbone",
    description: "An AI-assisted literary investigation into a murder mystery with 100 shuffled pages, combining clue indexing, historical research and systematic testing of possible page orders.",
    icon: <MagnifyingGlass size={48} />,
    url: "https://github.com/seanbetts/cains-jawbone",
    type: "research experiment",
    schemaType: "CreativeWork",
    date: "December 2025–January 2026",
    technologies: ["Python", "Markdown", "Git", "Agent skills"],
    features: [
      "Annotates pages and indexes people, places, quotations and recurring motifs",
      "Uses modular agent workflows for research, wordplay and narrative analysis",
      "Records ordering hypotheses alongside evidence and possible contradictions",
      "Uses integrity checks to protect the original text during analysis"
    ],
    challenges: "Separating plausible interpretations from supported conclusions across 100 shuffled pages, while preserving the source text and checking hypotheses against contradictory evidence.",
    learnings: "Even the strongest AI models I tried could not crack Cain’s Jawbone. Their ability to produce convincing interpretations did not translate into a complete, correct solution. Working through the puzzle was a useful reminder of the gap between a plausible explanation and sustained reasoning that holds together across the whole problem.",
    status: "Experiment"
  },
  {
    id: "youtube-sdg-analysis",
    name: "YouTube SDG Analysis",
    description: "Developing AI techniques to map YouTube channels to the UN Sustainable Development Goals.",
    icon: <Video size={48} />,
    url: null,
    type: "github",
    date: "January–December 2025",
    technologies: [
        "Python",
        "YouTube Data API",
        "OpenAI API"
      ],
    features: ["YouTube video transcription", "Channel analysis", "SDG mapping"],
    challenges: "Developing an accurate model that can map SDGs to video content and scaling the analysis to over 2.5m videos.",
    learnings: "Platform APIs can bring so many good ideas to life, but they also put a critical part of the product outside your control. Access can be changed or withdrawn without notice. This project reinforced how much the viability of an idea can depend on a platform continuing to offer the data and capabilities it was built around.",
    status: "Completed",
  },
  {
    id: "ai-brand-detection",
    name: "AI Brand Detection",
    description: "Developing AI techniques to detect brands and products in videos.",
    icon: <Video size={48} />,
    url: "https://github.com/seanbetts/product-placement",
    type: "github",
    date: "August–December 2024",
    technologies: [
        "React",
        "Python",
        "PyTorch",
        "TheFuzz",
        "FastAPI",
        "GCP",
        "Google Cloud Speech API",
        "Google Cloud Vision API",
        "Segment Anything Model 2"
      ],
    features: ["Brand and product detection", "Multi-brand support", "Integration with marketing analytics"],
    challenges: "Developing an accurate model that can detect brands in various contexts and lighting conditions.",
    learnings: "Visual recognition capabilities have improved incredibly quickly, but technical feasibility does not automatically make a product economically viable. For this kind of video analysis, I found the economics difficult to justify without very large scale. The cost of delivering useful results matters just as much as the ability to produce them.",
    status: "Completed",
  },

  {
    id: "genai-marketing-benchmarks",
    name: "GenAI Marketing Benchmarks",
    description: "Developing comprehensive benchmarks to assess the marketing knowledge and capabilities of large language models.",
    icon: <Ruler size={48} />,
    url: "https://github.com/seanbetts/genai-marketing-benchmarks",
    type: "github",
    date: "June–December 2024",
    technologies: [
      "Python",
      "SQLite",
      "OpenAI API",
      "Anthropic API",
      "Google AI API",
      "Together AI",
      "AI Harness",
      "pandas",
      "matplotlib",
      "Flask"
    ],
    features: [
      "Comprehensive marketing knowledge assessment",
      "Comparative analysis of different LLMs",
      "Customizable benchmarking criteria",
      "Multiple-choice question database",
      "Automated testing across various LLMs"
    ],
    challenges: "Creating a diverse and representative set of marketing questions that cover various aspects and difficulty levels. Ensuring the integrity of the benchmark by preventing the questions from being included in future LLM training datasets.",
    learnings: "Creating benchmarks for an industry is very difficult without engagement from its industry bodies. Building the tests is only part of the work: the benchmark also needs shared agreement about what matters and confidence that it represents the industry. That makes participation and adoption central to the project.",
    status: "Completed",
    heroImage: "/images/projects/genai-marketing-benchmarks-hero.png"
  },

  {
    id: "genai-timeline",
    name: "GenAI Timeline",
    description: "A timeline of GenAI developments and milestones, tracking the rapid progress in the field.",
    icon: <Clock size={48} />,
    url: "https://timeline.the-blueprint.ai",
    type: "blog",
    date: "May 2024–present",
    technologies: ["React", "D3.js", "Node.js"],
    features: ["Interactive timeline visualization", "Filterable AI milestones", "Regular updates with new developments"],
    challenges: "Keeping the timeline up-to-date with the rapidly evolving field of GenAI.",
    learnings: "A simple timeline of how GenAI technology has developed can be a great traffic driver. There is real value in helping people make sense of the pace of change through a clear chronological view. This project was a reminder that a straightforward, useful reference can give people a strong reason to visit.",
    status: "Ongoing",
    heroImage: "/images/projects/genai-timeline-hero.png"
  },
  {
    id: "ai-chat-experience",
    name: "🐼 panda.ai",
    description: "A GenAI personal assistant designed to learn from you and adapt to your unique needs. As you interact with 🐼 panda.ai, it evolves and grows, learning from your conversations, web browsing behaviour, social media activity, music preferences, and even your spending habits.",
    icon: <ChatCircleDots size={48} />,
    url: "https://github.com/the-blueprint-ai/panda.ai",
    type: "github",
    date: "March–June 2023",
    technologies: [
      "Vue.js 3",
      "FastAPI",
      "PostgreSQL",
      "DynamoDB",
      "Pinecone",
      "AWS S3",
      "OpenAI GPT-3.5 Turbo",
      "Langchain",
      "SuperTokens",
      "Stripe",
      "SendGrid"
    ],
    features: [
      "Personalized AI chat assistant",
      "User authentication and account management",
      "Subscription plans with different tiers",
      "Integration selection for enhanced AI capabilities",
      "User data management and privacy controls",
      "Admin panel for managing users and viewing statistics",
      "Multiple API integrations (YouTube, Google Maps, Wikipedia, Spotify, etc.)"
    ],
    challenges: "Implementing an efficient and effective way to store and retrieve user memories without compromising privacy. Integrating multiple APIs and data sources to create a comprehensive user profile while ensuring data security and user privacy.",
    learnings: "Three years on, I still do not think frontier AI companies have delivered a consumer experience that fulfils the promise of the technology. I expected the labs to focus much more on how people would actually use these capabilities. The gap between what the models can do and the experience of using them remains much wider than I anticipated, with a great deal of product and UX work still to do.",
    status: "Completed",
    heroVideo: "https://www.youtube.com/embed/Gs-oqqxsBMc?si=0SiQwmqSQG3typ6l"
  },
];

export default projectsData;
