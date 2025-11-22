import { Video, Ruler, Clock, ChatCircleDots, ChalkboardTeacher, Student, Lightbulb, Calendar, Globe, MagnifyingGlass } from "@phosphor-icons/react";

const projectsData = [
  {
    "id": "llm-search-analysis",
    "name": "LLM Search Analysis",
    "description": "A comparative analysis tool for evaluating web search capabilities across OpenAI, Google Gemini, and Anthropic Claude models with interactive testing and batch analysis.",
    "icon": <MagnifyingGlass size={48} />,
    "url": "https://github.com/seanbetts/llm-search-analysis",
    "type": "github",
    "date": "November 2025",
    "technologies": [
      "Python",
      "Streamlit",
      "SQLite",
      "SQLAlchemy",
      "OpenAI API",
      "Google AI API",
      "Anthropic API",
      "pandas"
    ],
    "features": [
      "Multi-provider support (OpenAI, Google Gemini, Anthropic Claude)",
      "9 AI models with web search capabilities",
      "3-tab interface (Interactive, Batch Analysis, Query History)",
      "Database integration with full interaction persistence",
      "Rank tracking for search result citations",
      "CSV export for batch analysis results",
      "Real-time search query and source analysis"
    ],
    "challenges": "Integrating three different provider APIs with varying search implementations, implementing accurate rank tracking for cited sources, and creating a unified interface for comparing search behaviors across models.",
    "futureImprovements": "Add visualization dashboards for search pattern analysis, implement A/B testing framework for prompt optimization, and expand to include more AI providers.",
    "status": "Completed",
    "heroImage": "/images/projects/llm-search-analysis-hero.png"
  },
  {
    "id": "genai-explorer",
    "name": "Generative AI Explorer",
    "description": "An interactive web application that visualizes the landscape of generative AI companies, models, benchmarks, and capabilities.",
    "icon": <Globe size={48} />,
    "url": "https://explorer.the-blueprint.ai/",
    "type": "website",
    "date": "May 2025 onwards",
    "technologies": [
      "React 19",
      "Next.js 15.3",
      "TypeScript",
      "Tailwind CSS"
    ],
    "features": [
      "Model explorer by category",
      "Benchmark comparisons",
      "Rich media galleries",
      "Company profiles",
      "Model comparison tool"
    ],
    "challenges": "Creating a structured data model to represent the complex AI ecosystem and enabling meaningful comparisons across diverse model types.",
    "futureImprovements": "Chat interface for intuitive exploration, expanded benchmark database, and real-time data updates",
    "status": "Active",
    "heroImage": "/images/projects/xxx.jpg"
  },
  {
    id: "youtube-sdg-analysis",
    name: "YouTube SDG Analysis",
    description: "Developing AI techniques to map YouTube channels to the UN Sustainable Development Goals.",
    icon: <Video size={48} />,
    url: "#",
    type: "github",
    date: "January 2025 onwards",
    technologies: [
        "Python",
        "YouTube Data API",
        "OpenAI API"
      ],
    features: ["YouTube video transcription", "Channel analysis", "SDG mapping"],
    challenges: "Developing an accurate model that can map SDGs to video content and scaling the analysis to over 2.5m videos.",
    futureImprovements: "Develop visual reporting and more robust scaling methods",
    status: "Ongoing",
    heroImage: "/images/projects/xxx.jpg"
  },
  {
    id: "ai-brand-detection",
    name: "AI Brand Detection",
    description: "Developing AI techniques to detect brands and products in videos.",
    icon: <Video size={48} />,
    url: "https://github.com/seanbetts/product-placement",
    type: "github",
    date: "August 2024 onwards",
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
    id: "beyond-chatbots",
    name: "Beyond Chatbots",
    description: "A comprehensive series exploring the future of Large Language Models (LLMs) and their transformation from simple chatbots into intuitive, indispensable digital companions.",
    icon: <Lightbulb size={48} />,
    url: "https://www.the-blueprint.ai/p/beyond-chatbots",
    type: "blog",
    date: "July - October 2024",
    features: [
      "In-depth analysis of current LLM limitations",
      "Vision for the future of digital companions",
      "Discussion of ethical considerations and challenges",
      "Practical insights for developers, researchers, and business leaders"
    ],
    topics: [
      "Personalisation in AI",
      "Integration with digital ecosystems",
      "Proactive AI assistance",
      "Adaptive AI personalities",
      "Fact-checking and information verification",
      "Human-AI collaboration"
    ],
    challenges: "Addressing technical hurdles in continuous learning and contextual understanding. Navigating ethical considerations such as privacy, data security, and the risk of over-reliance on AI. Balancing the benefits of AI assistance with the need to maintain human autonomy and critical thinking skills.",
    futureImprovements: "Expand the series with practical case studies. Develop prototypes or proof-of-concepts for key features discussed. Create interactive demonstrations of potential digital companion functionalities.",
    status: "Completed",
    heroImage: "/images/projects/beyond-chatbots-hero.png"
  },
  {
    id: "genai-marketing-benchmarks",
    name: "GenAI Marketing Benchmarks",
    description: "Developing comprehensive benchmarks to assess the marketing knowledge and capabilities of large language models.",
    icon: <Ruler size={48} />,
    url: "https://github.com/seanbetts/genai-marketing-benchmarks",
    type: "github",
    date: "June 2024 onwards",
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
    status: "Ongoing",
    heroImage: "/images/projects/genai-marketing-benchmarks-hero.png"
  },
  {
    id: "genai-newsletter",
    name: "Weekly GenAI Newsletter",
    description: "A curated weekly newsletter covering the latest developments, breakthroughs, and applications in Generative AI.",
    icon: <Calendar size={48} />,
    url: "https://www.the-blueprint.ai",
    type: "blog",
    date: "July 2023 onwards",
    features: [
      "Weekly roundup of key GenAI news and developments",
      "In-depth analysis of emerging GenAI trends and technologies",
      "Curated list of must-read long-read articles",
      "Spotlight on innovative AI applications across industries",
      "Expert commentary on AI ethics and policy developments"
    ],
    challenges: "Staying up-to-date with the rapidly evolving GenAI landscape, distilling complex technical information into accessible insights, and maintaining a consistent publishing schedule while ensuring high-quality, relevant content.",
    futureImprovements: "Implement personalized content recommendations based on reader interests, expand to include interactive elements such as polls or Q&A sessions, and develop a community platform for subscribers to discuss and share insights.",
    status: "Ongoing",
    heroImage: "/images/projects/genai-newsletter-hero.png"
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
  {
    id: "genai-webinar-series",
    name: "Generative AI Webinar Series",
    description: "A comprehensive series of 12 webinars introducing Generative AI, its applications in marketing, ethical considerations, and future implications.",
    icon: <ChalkboardTeacher size={48} />,
    url: "https://vimeo.com/user/61969948/folder/17042522?isPrivate=false",
    type: "video",
    date: "July 2023 - April 2024",
    features: [
      "Practical demonstrations of AI tools and techniques",
      "Real-world examples and case studies in marketing",
      "Exploration of ethical considerations in AI",
      "Future predictions and implications for the marketing industry"
    ],
    topics: [
      "Introduction to Artificial Intelligence and Generative AI",
      "The Impact of Generative AI on consumers, work, and society",
      "Ethics of Generative AI",
      "Future of AI explored through sci-fi film scenarios",
      "The Future of Marketing with Generative AI (2-part series)",
      "Omnicom's approach to integrating Generative AI",
      "Prompt Engineering for Marketing (2-part series)",
      "Creating Content with Generative AI",
      "15 Months of Gen-AI Progress: A comprehensive review",
      "Synthetic Data in Marketing"
    ],
    challenges: "Simplifying complex AI concepts for a diverse audience while keeping the content engaging and relevant. Balancing theoretical knowledge with practical applications in marketing. Staying up-to-date with rapidly evolving AI technologies and their implications.",
    futureImprovements: "Create follow-up advanced courses focusing on specific AI applications in marketing. Provide hands-on workshops for practical skill development. Develop an online resource center with updated information on AI advancements and their marketing implications.",
    status: "Completed",
    heroImage: "/images/projects/genai-webinar-series-hero.png"
  },
  {
    id: "little-ai-lessons",
    name: "Little AI Lessons",
    description: "A series of 100 daily AI lessons published on LinkedIn over the last 100 days of 2023. Each lesson covers a different AI-related topic and is presented at 5 levels of difficulty, from beginner to expert.",
    icon: <Student size={48} />,
    url: "https://www.the-blueprint.ai/p/little-ai-lessons",
    type: "blog",
    date: "September - December 2023",
    features: [
      "100 daily AI lessons",
      "5 difficulty levels per lesson (beginner to expert)",
      "Interactive engagement with LinkedIn audience"
    ],
    topics: [
      "Artificial Intelligence (AI)", "Machine Learning", "Data Ethics", "Neural Networks", 
      "Deep Learning", "Generative Artificial Intelligence (GAI)", 
      "Artificial General Intelligence (AGI)", "Bias in AI", "Explainable AI (XAI)", 
      "Computer Vision", "Speech Recognition", "Natural Language Processing (NLP)", 
      "Supervised Learning", "Unsupervised Learning", "Data Privacy", 
      "Reinforcement Learning", "Multi-Agent Systems", 
      "Reinforcement Learning from Human Feedback (RLHF)", "Fairness", "Reward Model", 
      "Reward Gaming", "Regularisation Techniques", "Data Augmentation", 
      "Feature Engineering", "Anomaly Detection", "Clustering", "Dimensionality Reduction", 
      "Accountability", "Artificial Neuron", "Activation Functions", "Loss Functions", 
      "Optimisation Algorithms", "Parameters", "Hyperparameters", "AutoML", 
      "Model Architectures", "Dimensions in Neural Networks", "Model Evaluation Metrics", 
      "Cross-Validation Techniques", "Outer Alignment", "Recurrent Neural Networks (RNNs)", 
      "Generative Adversarial Networks (GANs)", "Variational Autoencoders (VAEs)", 
      "Graph Neural Networks", "Inner Alignment", "Transformer Architecture", 
      "Attention Mechanisms", "Sequence-to-Sequence Models", "Tokens in NLP", "Embeddings", 
      "Large Language Model (LLM)", "Generative Pre-training Transformer (GPT)", 
      "Ethical AI Design", "Swarm Intelligence", "Few-Shot Prompt", "One-Shot Prompt", 
      "Zero-Shot Prompt", "Scaling Laws", "Scalability", "GPUs", "TPUs", 
      "Other Accelerators", "AI Governance", "Hardware Optimisation Techniques", 
      "Cloud Computing and AI", "Edge Computing in AI", "Federated Learning", "AI Safety", 
      "Batch Learning", "Mini-Batch Learning", "Online Learning", "Transfer Learning", 
      "Meta-Learning", "Ensemble Methods", "Human-In-The-Loop (HITL) AI", "Safeguards", 
      "Diffusion Model", "Emergence", "Synthetic Data Generation", "Bayesian Networks", 
      "Chain of Thought", "Tree of Thought", "Chaining", "Steerability", "Moderation Tools", 
      "Red Teaming", "Regulatory Frameworks", "Disclosure Mechanism", "Finetuning", 
      "Prompt Engineering", "Real-World Deployment", "Reflection", "Social Impact of AI", 
      "Economic Impact of AI", "Conversational Agents", "Open-Source Software", 
      "Interdisciplinary AI", "AI Policy", "Human-AI Collaboration", "AI for Social Good"
    ],
    challenges: "Consistently producing high-quality, informative content daily while catering to different expertise levels. Simplifying complex AI concepts without losing depth or accuracy. Maintaining engagement and relevance across 100 consecutive days.",
    futureImprovements: "Compile the lessons into an e-book or interactive online course. Create video content to complement the written lessons.",
    status: "Completed",
    heroImage: "/images/projects/little-ai-lessons-hero.png"
  }
];

export default projectsData;