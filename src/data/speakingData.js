const speakingData = [
  // 2026
  {
    id: "lead-2026",
    title: "Advertising And Trust In The Time Of AI Panel",
    type: "panel",
    description: "Panel discussion on the changing advertising landscape and whether ads cretaed by machines can still be trusted by humans.",
    date: "5 February 2026",
    location: "London, UK",
    conference: "LEAD 2026",
    image: "/images/speaking/lead-2026.jpg"
  },
  // 2025
  {
    id: "profound-zero-click-london-2025",
    title: "Zero Click Agency Panel",
    type: "panel",
    description: "Panel discussion on AEO/GEO strategies, architecting for AI discoverability vs human engagement, zero-click search impact on performance marketing, and rethinking success metrics when traffic no longer equals sales.",
    date: "19 November 2025",
    location: "London, UK",
    conference: "Profound's Zero Click London 2025",
    image: "/images/speaking/profound-zero-click-london-2025.jpg"
  },
  {
    id: "future-media-talk-2025",
    title: "Web 4.0: Building Authority",
    type: "talk",
    description: "Exploring the evolution of the web into its fourth generation, examining the rise of agentic AI and the transformation of digital experiences.",
    date: "5 November 2025",
    location: "London, UK",
    conference: "Future of Media 2025",
    image: "/images/speaking/fom-2025.png"
  },
  {
    id: "gcs-inside-media-2026",
    title: "Web 4.0: Building Authority",
    type: "keynote",
    description: "Exploring the evolution of the web into its fourth generation, examining the rise of agentic AI and the transformation of digital experiences.",
    date: "5 November 2025",
    location: "London, UK",
    conference: "Government Communications Service Inside Media 2026",
    image: "/images/speaking/gcs.png"
  },
  {
    id: "aop-publishing-tech-2025",
    title: "Embedding AI In Your Organisation",
    type: "talk",
    description: "Exploring how publishing organisations can integrate AI processes throughout their operations to enhance efficiency and innovation.",
    date: "8 October 2025",
    location: "London, UK",
    conference: "AOP Publishing Tech Talks 2025",
    image: "/images/speaking/aop-publishing-2025.jpeg"
  },
  {
    id: "brunel-salesforce-ai-2025",
    title: "Managing AI Adoption & Change",
    type: "panel",
    description: "Discussing practical, responsible adoption of generative AI from leadership strategy to hands-on experimentation - and its impact across industries.",
    date: "1 October 2025",
    location: "London, UK",
    conference: "Brunel x Salesforce AI Conference",
    image: "/images/speaking/brunel-2025.jpeg"
  },
  {
    id: "overbury-ai-seminar-2025",
    title: "AI: From Idea to Everyday Reality",
    type: "keynote",
    description: "Exploring practical applications of AI in daily life and the construction industry, highlighting key insights and future trends.",
    date: "30 September 2025",
    location: "London, UK",
    conference: "Overbury Client Seminar",
    image: "/images/speaking/overbury-2025.jpg"
  },
  {
    id: "apple-web4-2025",
    title: "Web 4.0: Building Authority",
    type: "keynote",
    description: "Exploring the evolution of the web into its fourth generation, examining the rise of agentic AI and the transformation of digital experiences.",
    date: "24 September 2025",
    location: "San Francisco, USA",
    conference: "Apple Interactive Conference",
    image: "/images/speaking/apple-2025.jpeg"
  },
  {
    id: "gcs-learning-festival 2025",
    title: "The Future of Communications",
    type: "keynote",
    description: "Discussing how Web 4.0 and AI agents are reshaping communications - zero-click search, browsing and purchasing, building authority in AI platforms, and practical steps to make content machine-readable and trusted.",
    date: "23 September 2025",
    location: "London, UK",
    conference: "Government Communications Service Learning Festival 2025",
    image: "/images/speaking/gcs-learning-2025.jpeg"
  },
  {
    id: "giffgaff-ai-day-2025",
    title: "AI That Works",
    type: "keynote",
    description: "Explaining what AI and generative AI are, how they’re already used in marketing, and the next practical opportunities-framed by sustainability considerations and real campaign case studies.",
    date: "17 September 2025",
    location: "Uxbridge, UK",
    conference: "giffgaff AI Day",
    image: "/images/speaking/giffgaff-2025.jpeg"
  },
  {
    id: "barclays-marketing-frontiers-2025",
    title: "Influence & Community in the Age of AI",
    type: "keynote",
    description: "Exploring how AI platforms are reshaping influence and community-covering authority in LLMs, zero-click journeys, and synthetic consumer insights-and what this means for brand strategy.",
    date: "16 September 2025",
    location: "London, UK",
    conference: "Barclays Marketing Frontiers 2025",
    image: "/images/speaking/barclays.svg"
  },
  {
    id: "ai-adoption-podcast-2025",
    title: "Disruptive AI: Sean Betts on Agentic AI and Synthetic Data",
    type: "podcast",
    description: "Discussing how generative and agentic AI are reshaping the industry, from producing campaign content to designing synthetic research panels that simulate consumer behavior, the emerging capabilities of using synthetic data, the evolution of agentic AI, and potential societal and business model disruptions.",
    date: "21 August 2025",
    location: "Virtual",
    conference: "The AI Adoption Podcast",
    image: "/images/speaking/ai-adoption-podcast-2024.jpg"
  },
  {
    id: "dmwf-london-2025",
    title: "Simulating Britain - AI That Thinks Like Us",
    type: "talk",
    description: "Presenting insights on how AI can be developed to understand and reflect human behaviour and cultural nuances.",
    date: "24 June 2025",
    location: "London, UK",
    conference: "Digital Marketing World Forum",
    image: "/images/speaking/dmwf-2025.png"
  },
  {
    id: "jcdecaux-speaker-series-2025",
    title: "OMG's Approach to AI",
    type: "keynote",
    description: "Sharing how Omnicom Media Group is approaching AI, their focus in terms of capabilities and future roadmap.",
    date: "16 June 2025",
    location: "London, UK",
    conference: "JCDecaux Speaker Series",
    image: "/images/speaking/jcd.svg"
  },
  {
    id: "programmatic-pioneers-2025",
    title: "How do agencies envision the future of AI?",
    type: "panel",
    description: "Panel discussion on the opportunities for AI across digital media and programmatic advertising",
    date: "6 June 2025",
    location: "London, UK",
    conference: "Programmatic Pioneers 2025",
    image: "/images/speaking/programmatic-pioneers-2025.jpg"
  },
  {
    id: "futureweek-forum-2025",
    title: "FutureWeek Forum",
    type: "panel",
    description: "Discussing the future of technology and innovation with industry leaders.",
    date: "5 March 2025",
    location: "London, UK",
    conference: "FutureWeek Forum 2025",
    image: "/images/speaking/future-week-forum-2025.jpg"
  },
  {
    id: "gcs-inside-media-2025",
    title: "What is Generative AI Really?",
    type: "keynote",
    description: "Explaining what generative AI is, why it matters, and how it will reshape marketing and communications - from synthetic data and real-time creative to EX and AI assistants.",
    date: "28 January 2025",
    location: "London, UK",
    conference: "Government Communications Service Inside Media 2025",
    image: "/images/speaking/gcs.png"
  },

  // 2024
  {
    id: "ipo-generative-ai-2024",
    title: "Generative AI for Communicators",
    type: "keynote",
    description: "An audience with Sean Betts exploring how generative AI is transforming communications and what professionals need to know.",
    date: "28 November 2024",
    location: "Virtual",
    conference: "Intellectual Property Office",
    image: "/images/speaking/ipo-2024.jpg"
  },
  {
    id: "uk-gov-marketing-breakfast-2024",
    title: "What is Generative AI Really?",
    type: "keynote",
    description: "Explaining what generative AI is, why it matters, and how it will reshape marketing and communications - from synthetic data and real-time creative to EX and AI assistants.",
    date: "26 November 2024",
    location: "London, UK",
    conference: "UK Government Marketing Leaders Group Breakfast",
    image: "/images/speaking/gcs.png"
  },
  {
    id: "infosummit-london-2024",
    title: "AI Innovation Panel",
    type: "panel",
    description: "Discussing the excitement of AI innovations, the challenges it poses, and its transformative impact on the future of media and marketing.",
    date: "13 November 2024",
    location: "London, UK",
    conference: "InfoSummit London 2024",
    image: "/images/speaking/infosummit-2024.png"
  },
  {
    id: "isba-procurement-2024",
    title: "Does AI Know More About Advertising Than You?",
    type: "talk",
    description: "Presenting findings from the generative AI marketing benchmark project, evaluating LLMs' marketing knowledge and capabilities.",
    date: "8 November 2024",
    location: "London, UK",
    conference: "ISBA Procurement Conference",
    image: "/images/speaking/isba.png"
  },
  {
    id: "future-media-panel-2024",
    title: "3 Big Digital Shifts That Will Change Your Media Strategy",
    type: "panel",
    description: "Panel exploring significant digital shifts including cookie deprecation, retail media, clean rooms, and AI/ML technologies transforming advertising strategy.",
    date: "9 October 2024",
    location: "London, UK",
    conference: "Future of Media 2024",
    image: "/images/speaking/fom-2024.jpg"
  },
  {
    id: "future-media-talk-2024",
    title: "Does AI Know More About Advertising Than You?",
    type: "talk",
    description: "Presenting preliminary results from testing AI models on marketing knowledge, including key findings and implications for different marketing disciplines.",
    date: "9 October 2024",
    location: "London, UK",
    conference: "Future of Media",
    image: "/images/speaking/future-of-media-2024.jpg"
  },
  {
    id: "gcs-learning-festival-2024",
    title: "GenAI for Communicators",
    type: "keynote",
    description: "Discussing how generative AI is changing communications-practical tools you can use today and what’s coming next.",
    date: "24 September 2024",
    location: "London, UK",
    conference: "Government Communications Service Learning Festival",
    image: "/images/speaking/gcs.png"
  },
  {
    id: "identity-architects-podcast-2024",
    title: "Scared and Excited",
    type: "podcast",
    description: "Discussing generative AI's disruptive impact on marketing, advertising, and media, data privacy, the future of search technology and AI-powered personal assistants, publisher revenue models, synthetic data applications, and brand safety.",
    date: "5 September 2024",
    location: "Virtual",
    conference: "Identity Architects Podcast (InfoSum)",
    image: "/images/speaking/infosum-2024.jpg"
  },
  {
    id: "programmatic-pioneers-2024",
    title: "Revolutionising Creative With AI",
    type: "keynote",
    description: "Discussing how generative AI is reshaping creative work-from real-time generation, dubbing and digital avatars to music creation-plus the pitfalls, guardrails, and what’s next (synthetic data, real-time creative and EX) for marketing.",
    date: "23 May 2024",
    location: "London, UK",
    conference: "Programmatic Pioneers",
    image: "/images/speaking/programmatic-pioneers-2024.jpg"
  },
  {
    id: "media-360-2024",
    title: "AI & Media Innovation",
    type: "panel",
    description: "Exploring AI-driven innovation in media and advertising.",
    date: "22 May 2024",
    location: "Brighton, UK",
    conference: "Media 360",
    image: "/images/speaking/media360-2024.jpg"
  },
  {
    id: "adweek-europe-2024",
    title: "Demand More From Your Data: Using AI to Drive ROI",
    type: "panel",
    description: "Panel discussion on leveraging AI to maximise return on investment from data-driven marketing strategies.",
    date: "14 May 2024",
    location: "London, UK",
    conference: "Advertising Week Europe",
    image: "/images/speaking/adweek-2024.jpg"
  },
  {
    id: "future-of-brands-2024",
    title: "Look - shiny new things! What's Revolutionary vs. What's Not?",
    type: "panel",
    description: "Panel discussion cutting through the hype to identify truly transformative technologies for brands-distinguishing revolutionary AI applications from fleeting trends and exploring what actually drives lasting innovation in marketing.",
    date: "17 April 2024",
    location: "London, UK",
    conference: "Future of Brands 2024",
    image: "/images/speaking/future-of-brands-2024.jpg"
  },
  {
    id: "barclays-ai-comms-2024",
    title: "AI and the Future of Communications",
    type: "panel",
    description: "Expert panel de-mystifying AI and examining its transformative potential for communications and audience engagement, featuring discussion on how Barclays is using AI.",
    date: "26 March 2024",
    location: "London, UK",
    conference: "Barclays New Perspectives",
    image: "/images/speaking/barclays.svg"
  },
  {
    id: "genai-marketing-summit-2024",
    title: "Generative AI: Disrupting Advertising",
    type: "panel",
    description: "Panel exploring how generative AI is transforming advertising through personalised creative at scale, enhanced programmatic buying, and optimised ROI, while addressing crucial risks around bias and quality.",
    date: "28 February 2024",
    location: "London, UK",
    conference: "Generative AI for Marketing Summit",
    image: "/images/speaking/genai-marketing-2023.png"
  },

  // 2023
  {
    id: "middlesex-ai-masterclass-2023",
    title: "AI & The Future of Marketing",
    type: "keynote",
    description: "Discussing what AI and generative AI are, why progress has accelerated, and what this means for marketing now and next.  ",
    date: "28 November 2023",
    location: "Virtual",
    conference: "Middlesex University",
    image: "/images/speaking/middlesex-2023.png"
  },
  {
    id: "gcs-inside-media-2024",
    title: "AI & Communications",
    type: "keynote",
    description: "Exploring AI and its impact on government communications.",
    date: "28 November 2023",
    location: "London, UK",
    conference: "Government Communications Service Inside Media 2024",
    image: "/images/speaking/gcs.png"
  },
  {
    id: "linkedin-emea-leadership-2023",
    title: "AI Strategy & Innovation",
    type: "keynote",
    description: "Presenting AI strategy insights to LinkedIn's EMEA leadership team.",
    date: "14 November 2023",
    location: "London, UK",
    conference: "LinkedIn EMEA Leadership Team",
    image: "/images/speaking/linkedin-2023.webp"
  },
  {
    id: "barclays-marketing-frontiers-2023",
    title: "AI & the Future of Marketing",
    type: "keynote",
    description: "Exploring how AI is reshaping the future of marketing strategy and execution.",
    date: "19 October 2023",
    location: "London, UK",
    conference: "Barclays Marketing Frontiers",
    image: "/images/speaking/barclays-2023.jpg"
  },
  {
    id: "cheq-breakfast-briefing-2023",
    title: "Generative AI's Impact on Marketing, Security, and Privacy",
    type: "talk",
    description: "Conversation on Generative AI's impact on marketing, security, and privacy, discussing opportunities and associated risks shaping Go-to-Market strategies.",
    date: "1 October 2023",
    location: "London, UK",
    conference: "CHEQ Executive Breakfast Briefing",
    image: "/images/speaking/cheq-2023.png"
  },
  {
    id: "guardian-marketing-conf-2023",
    title: "Unlocking AI: Secrets and Strategies Revealed",
    type: "panel",
    description: "Panel discussion revealing AI strategies and insights for marketing professionals.",
    date: "15 June 2023",
    location: "London, UK",
    conference: "Guardian Marketing Conference",
    image: "/images/speaking/guardian-2025.png"
  }
];

export default speakingData;
