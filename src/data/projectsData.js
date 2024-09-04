import { Video, Ruler, Clock, ChatCircleDots, ChalkboardTeacher, Student } from "@phosphor-icons/react";

const projectsData = [
  {
    id: "ai-brand-detection",
    name: "AI Brand Detection",
    description: "Coming soon... Shh...",
    icon: <Video size={48} />,
    url: "#",
    type: "github",
    date: "2024",
    technologies: ["TensorFlow", "Python", "OpenCV"],
    features: ["Real-time brand detection", "Multi-brand support", "Integration with marketing analytics"],
    challenges: "Developing an accurate model that can detect brands in various contexts and lighting conditions.",
    futureImprovements: "Expand the database of recognizable brands and improve detection speed.",
    status: "In development"
  },
  {
    id: "genai-marketing-benchmarks",
    name: "GenAI Marketing Benchmarks",
    description: "Developing comprehensive benchmarks to assess the marketing knowledge and capabilities of large language models.",
    icon: <Ruler size={48} />,
    url: "https://github.com/seanbetts/genai-marketing-benchmarks",
    type: "github",
    date: "2023",
    technologies: ["Python", "Hugging Face Transformers", "Pandas"],
    features: ["Comprehensive marketing knowledge assessment", "Comparative analysis of different LLMs", "Customizable benchmarking criteria"],
    challenges: "Creating a diverse and representative set of marketing questions that cover various aspects and difficulty levels.",
    futureImprovements: "Expand the question database and integrate with more LLMs as they become available.",
    status: "Ongoing"
  },
  {
    id: "genai-timeline",
    name: "GenAI Timeline",
    description: "A timeline of generative AI developments and milestones, tracking the rapid progress in the field.",
    icon: <Clock size={48} />,
    url: "https://timeline.the-blueprint.ai",
    type: "blog",
    date: "2023",
    technologies: ["React", "D3.js", "Node.js"],
    features: ["Interactive timeline visualization", "Filterable AI milestones", "Regular updates with new developments"],
    challenges: "Keeping the timeline up-to-date with the rapidly evolving field of generative AI.",
    futureImprovements: "Implement user contributions and add more detailed information for each milestone.",
    status: "Active"
  },
  {
    id: "ai-chat-experience",
    name: "AI Chat Experience Prototype",
    description: "A proof-of-concept GenAI chat experience capable of creating user memories for more personalized AI interactions.",
    icon: <ChatCircleDots size={48} />,
    url: "https://github.com/the-blueprint-ai/panda.ai",
    type: "github",
    date: "2023",
    technologies: ["Python", "Flask", "OpenAI API"],
    features: ["User memory creation", "Personalized responses", "Context-aware conversations"],
    challenges: "Implementing an efficient and effective way to store and retrieve user memories without compromising privacy.",
    futureImprovements: "Enhance the memory retrieval algorithm and implement more sophisticated personalization features.",
    status: "Prototype"
  },
  {
    id: "genai-webinar-series",
    name: "Generative AI Webinar Series",
    description: "A series of 12 webinars introducing Generative AI, ethical issues, how to use it and looking at the future of marketing.",
    icon: <ChalkboardTeacher size={48} />,
    url: "https://vimeo.com/user/61969948/folder/17042522?isPrivate=false",
    type: "video",
    date: "2023",
    technologies: ["Zoom", "Vimeo", "PowerPoint"],
    features: ["12 comprehensive webinars", "Interactive Q&A sessions", "Practical demonstrations"],
    challenges: "Simplifying complex AI concepts for a diverse audience while keeping the content engaging and relevant.",
    futureImprovements: "Create follow-up advanced courses and provide hands-on workshops.",
    status: "Completed"
  },
  {
    id: "little-ai-lessons",
    name: "Little AI Lessons",
    description: "A series of little AI lessons that I published on LinkedIn over the last 100 days of 2023 with each lesson having 5 levels of difficulty from beginner to expert.",
    icon: <Student size={48} />,
    url: "https://www.the-blueprint.ai/p/little-ai-lessons",
    type: "blog",
    date: "2023",
    technologies: ["LinkedIn", "Canva", "Markdown"],
    features: ["100 daily AI lessons", "5 difficulty levels per lesson", "Wide range of AI topics covered"],
    challenges: "Consistently producing high-quality, informative content daily while catering to different expertise levels.",
    futureImprovements: "Compile the lessons into an e-book or interactive online course.",
    status: "Completed"
  }
];

export default projectsData;