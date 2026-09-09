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
    date: "December 2025 onwards",
    technologies: ["SvelteKit", "FastAPI", "TypeScript", "Python", "Supabase"],
    features: [
      "Streaming chat that surfaces skills, attachments, and the context from recent notes, tasks, and files.",
      "Notes + tasks + projects that stay in sync with skills so sideBar can organise, search, and act on your content.",
      "Websites + files ingestion with pinning, archiving, and indexed retrieval so saved pages and uploads are instantly available in conversation.",
      "Skills system (required, standard, and installable store skills) that lets sideBar chain capabilities automatically while keeping availability visible in Settings."
    ],
    challenges:
      "Giving the assistant seamless access to everything you’ve created while honoring real-time sync, soft deletes, and your encrypted API keys across iPhone, iPad, Mac, and the browser.",
    futureImprovements:
      "Expand the Skills Store/OAuth coverage, harden the planned skill guard UI states, and keep building richer presets and automations while the interface stays minimal and readable.",
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
    futureImprovements: "Add more curated presets/themes, refine mobile interactions, and expand the single-page into a richer interactive homepage while keeping the minimal aesthetic.",
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
    futureImprovements: "Add visualization dashboards for search pattern analysis, implement A/B testing framework for prompt optimization, and expand to include more AI providers.",
    status: "Completed",
    heroImage: "/images/projects/llm-search-analysis-hero.png"
  },
  {
    id: "genai-explorer",
    name: "Generative AI Explorer",
    description: "An interactive web application that visualizes the landscape of generative AI companies, models, benchmarks, and capabilities.",
    icon: <Globe size={48} />,
    url: "https://explorer.the-blueprint.ai/",
    type: "website",
    date: "May 2025 onwards",
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
    futureImprovements: "Chat interface for intuitive exploration, expanded benchmark database, and real-time data updates",
    status: "Active",
    heroImage: "/images/projects/xxx.jpg"
  },
  {
    id: "steam-hardware-watch",
    name: "Steam Hardware Watch",
    description: "An agent-driven monitoring toolkit that tracks Valve hardware launch signals, compares evidence across sources and turns changes into readable reports.",
    icon: <GameController size={48} />,
    url: "https://github.com/seanbetts/steam-hardware-watch",
    type: "github",
    date: "2026",
    technologies: ["Python", "Shell", "Node.js", "SteamKit", "Playwright"],
    features: [
      "Checks Komodo, SteamDB, SteamTracking and Valve endpoints for hardware signals",
      "Saves source snapshots and compares each run with the previous one",
      "Produces evidence summaries and human-readable status reports",
      "Tracks discovered, retrieved and blocked visual assets separately"
    ],
    challenges: "Reconciling incomplete signals across multiple sources, handling browser-dependent access and distinguishing meaningful changes from routine metadata updates.",
    futureImprovements: "Potential extensions include broader hardware coverage and more reliable source access, while keeping each reported change traceable to its evidence.",
    status: "Published"
  },
  {
    id: "apple-hig-mirror",
    name: "Apple HIG Mirror",
    description: "A developer tool that turns Apple's browser-rendered Human Interface Guidelines into structured Markdown, with repeatable extraction, verification and scheduled updates.",
    icon: <BookOpen size={48} />,
    url: "https://github.com/seanbetts/Apple-HIG",
    type: "github",
    date: "2026",
    technologies: ["TypeScript", "Node.js", "Playwright", "Markdown", "GitHub Actions"],
    features: [
      "Discovers guideline pages and extracts their rendered content",
      "Normalises content into deterministic Markdown and frontmatter",
      "Rewrites internal links and generates a Mintlify preview configuration",
      "Verifies generated output and schedules incremental updates through GitHub Actions"
    ],
    challenges: "Extracting consistent content from a dynamic documentation site while preserving structure, keeping internal links useful and avoiding unnecessary changes in generated files.",
    futureImprovements: "Potential extensions include refining extraction as Apple's documentation evolves and improving how the mirrored guidelines are explored locally.",
    status: "Published"
  },
  {
    id: "pixel-loader-lab",
    name: "Pixel Loader Lab",
    description: "A small creative coding sandbox for turning an app icon into a pixelated animated loader, with a live preview and optimised GIF export.",
    icon: <SquaresFour size={48} />,
    url: "https://github.com/seanbetts/pixel-loader-lab",
    type: "github",
    date: "2026",
    technologies: ["JavaScript", "CSS", "Vite", "Node.js", "ffmpeg", "gifsicle"],
    features: [
      "Builds a pixelated loader from a source app icon",
      "Provides a browser preview for iterating on the animation",
      "Exports optimised GIFs for use in other apps",
      "Reports image dimensions and file sizes"
    ],
    challenges: "Keeping the source icon recognisable through pixelation and animation, while balancing crisp rendering with a compact exported file.",
    futureImprovements: "Potential experiments include additional motion patterns and export presets for different app surfaces.",
    status: "Published"
  },
  {
    id: "cains-jawbone",
    name: "Cain’s Jawbone",
    description: "An AI-assisted literary investigation into a murder mystery with 100 shuffled pages, combining clue indexing, historical research and systematic testing of possible page orders.",
    icon: <MagnifyingGlass size={48} />,
    url: "https://github.com/seanbetts/cains-jawbone",
    type: "research experiment",
    schemaType: "CreativeWork",
    date: "2025–2026",
    technologies: ["Python", "Markdown", "Git", "Agent skills"],
    features: [
      "Annotates pages and indexes people, places, quotations and recurring motifs",
      "Uses modular agent workflows for research, wordplay and narrative analysis",
      "Records ordering hypotheses alongside evidence and possible contradictions",
      "Uses integrity checks to protect the original text during analysis"
    ],
    challenges: "Separating plausible interpretations from supported conclusions across 100 shuffled pages, while preserving the source text and checking hypotheses against contradictory evidence.",
    futureImprovements: "The research approach could be adapted to other literary puzzles, with richer ways to explore connections between clues and compare competing hypotheses.",
    status: "Experiment"
  },
  {
    id: "youtube-sdg-analysis",
    name: "YouTube SDG Analysis",
    description: "Developing AI techniques to map YouTube channels to the UN Sustainable Development Goals.",
    icon: <Video size={48} />,
    url: "https://github.com/TheGoodNet/YouTube-Scripts",
    type: "github",
    date: "January 2025 to December 2025",
    technologies: [
        "Python",
        "YouTube Data API",
        "OpenAI API"
      ],
    features: ["YouTube video transcription", "Channel analysis", "SDG mapping"],
    challenges: "Developing an accurate model that can map SDGs to video content and scaling the analysis to over 2.5m videos.",
    futureImprovements: "Develop visual reporting and more robust scaling methods",
    status: "Completed",
    heroImage: "/images/projects/xxx.jpg"
  },
  {
    id: "ai-brand-detection",
    name: "AI Brand Detection",
    description: "Developing AI techniques to detect brands and products in videos.",
    icon: <Video size={48} />,
    url: "https://github.com/seanbetts/product-placement",
    type: "github",
    date: "August 2024 to December 2024",
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
    futureImprovements: "Implement object tracking with SAM 2, expanding the database of recognizable brands and improving detection speeds and efficiency.",
    status: "Completed",
    heroImage: "/images/projects/xxx.jpg"
  },

  {
    id: "genai-marketing-benchmarks",
    name: "GenAI Marketing Benchmarks",
    description: "Developing comprehensive benchmarks to assess the marketing knowledge and capabilities of large language models.",
    icon: <Ruler size={48} />,
    url: "https://github.com/seanbetts/genai-marketing-benchmarks",
    type: "github",
    date: "June 2024 to December 2024",
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
    futureImprovements: "Expand the question database, integrate with more LLMs as they become available, and develop phases for testing marketing understanding and capabilities.",
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
    date: "May 2024 onwards",
    technologies: ["React", "D3.js", "Node.js"],
    features: ["Interactive timeline visualization", "Filterable AI milestones", "Regular updates with new developments"],
    challenges: "Keeping the timeline up-to-date with the rapidly evolving field of GenAI.",
    futureImprovements: "Implement user contributions and add more detailed information for each milestone.",
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
    date: "March - June 2023",
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
    futureImprovements: "Enhance the memory retrieval algorithm, implement more sophisticated personalization features, and expand the range of integrations to provide a more comprehensive personal assistant experience.",
    status: "Completed",
    heroVideo: "https://www.youtube.com/embed/Gs-oqqxsBMc?si=0SiQwmqSQG3typ6l"
  },
];

export default projectsData;
