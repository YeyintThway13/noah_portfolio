import type { Project, Experience, FAQItem, ToolItem } from './types';

export const personalInfo = {
  name: "Yeyint Thway",
  nickname: "Yeyint",
  title: "Full Stack Developer",
  tagline: "Engineering fast, resilient systems from concept to cloud scale.",
  bio: "Full Stack Engineer with 4+ years shipping production web apps. Specialized in React, TypeScript, and Node.js architectures with a strong focus on high-throughput APIs, real-time performance, and clean code.",
  email: "yeyintthway656@gmail.com",
  github: "https://github.com/YeyintThway13",
  linkedin: "https://www.linkedin.com/in/yeyint-thway-b74036201/",
  stats: {
    experience: "4+",
    projects: "15+",
    clients: "10+"
  }
};

export const skills: string[] = [
  "TypeScript", "JavaScript", "Go", "Python", 
  "React.js", "Next.js", "Redux", "Node.js", 
  "Nest.js", "Express.js", "MongoDB", "Redis", 
  "PostgreSQL", "Socket.io", "Docker", "AWS", 
  "Nginx", "CI/CD", "Jest", "Agile"
];

export const projects: Project[] = [
  {
    id: "zalomi",
    title: "Zalomi E-Commerce",
    description: "Full-stack e-commerce system featuring a comprehensive product catalog, dynamic shopping cart, secure checkout, and an interactive admin dashboard.",
    fullDescription: "A comprehensive e-commerce platform designed from the ground up to support high-traffic sales. Features a fast product search engine, dynamic catalog filters, reactive shopping cart states, a secure Multi-Step checkout system with mockup payments, and a fully featured admin dashboard for tracking orders, managing products, and viewing sales metrics.",
    role: "Lead Full Stack Developer",
    category: "fullstack",
    tags: ["React.js", "Node.js", "MongoDB", "Material UI", "Express.js", "REST API"],
    achievements: [
      "Designed and developed the entire Node.js REST API with robust security models (JWT, request rate limiting).",
      "Created a modern, clean admin console utilizing Material UI, reducing product management time by 40%.",
      "Integrated complex MongoDB aggregation pipelines to generate real-time business and sales analytics dashboards."
    ],
    demoUrl: "https://example.com/zalomi",
    githubUrl: "https://github.com"
  },
  {
    id: "whisky-museum",
    title: "Grande Whisky Museum",
    description: "End-to-end digital membership solution including credit systems, event booking, payment gateways, and a sleek user interface.",
    fullDescription: "A luxurious digital web solution built for a private museum. Incorporates an complex member rewards credit ledger, booking calendar engines for private events and tasting sessions, secure e-commerce features, and JWT-authenticated member profiles.",
    role: "Full Stack Engineer",
    category: "fullstack",
    tags: ["React.js", "Node.js", "MongoDB", "JWT Auth", "Payment Gateway", "Material UI"],
    achievements: [
      "Implemented a secure transaction-ledger model in MongoDB to prevent double-spending of member credits.",
      "Developed a custom calendar booking interface that eliminated booking overlaps and automated email confirmations.",
      "Created a premium responsive design mirroring luxury museum branding guidelines."
    ],
    demoUrl: "https://example.com/whisky",
    githubUrl: "https://github"
  },
  {
    id: "channel-alpha",
    title: "Channel Alpha Movies",
    description: "High-traffic streaming and download platform featuring content delivery APIs, user subscription management, and responsive layouts.",
    fullDescription: "A high-performance media browsing and download platform optimized to deliver static assets smoothly. Includes custom streaming modules, tiered subscription models, complex data structures for movie categories, and a responsive media vault layout with instant query filters.",
    role: "Frontend Developer & API Architect",
    category: "frontend",
    tags: ["React.js", "Next.js", "Redux", "Tailwind CSS", "RESTful API", "AWS S3"],
    achievements: [
      "Optimized media query loading times by 50% using Redux store caching and lazy-loaded elements.",
      "Engineered clean RESTful content APIs that support paginated responses and fast full-text searching.",
      "Ensured 100% responsive styling layout across high-density mobile screens and 4k television browsers."
    ],
    demoUrl: "https://example.com/movies",
    githubUrl: "https://github"
  },
  {
    id: "kings-acumen",
    title: "Kings & Acumen Sites",
    description: "Full-stack portfolio and informational websites for private schools, combining content management APIs with performant layouts.",
    fullDescription: "Developed corporate landing systems and informational gateways for Kings Yangon and Acumen International private schools. Contains dynamic news dashboards, teacher profiles, course registration pipelines, and custom admin portals to manage site announcements.",
    role: "Full Stack Developer",
    category: "fullstack",
    tags: ["React.js", "Node.js", "MongoDB", "Nginx", "Admin CMS", "CSS Grid"],
    achievements: [
      "Built a secure custom CMS back-end, allowing non-technical school staff to publish articles and manage school calendars.",
      "Deployed the sites behind Nginx on AWS Lightsail with automatic SSL encryption and caching headers.",
      "Re-engineered CSS Grid layouts to align strictly with modern mobile-first usability standards."
    ],
    demoUrl: "https://example.com/schools",
    githubUrl: "https://github"
  }
];

export const experiences: Experience[] = [
  {
    id: "genesiv",
    company: "Genesiv (Rockqet)",
    role: "Backend Developer",
    period: "Dec 2023 – Jun 2025",
    summary: "Maintained and enhanced a large-scale community platform used by brokerage firms, developing new features across Node.js backend services and React.js frontend applications.",
    details: [
      "Refactored legacy frontend and backend codebases to improve maintainability, reduce technical debt, and enhance overall system performance.",
      "Developed real-time messaging features including threaded conversations, emoji reactions, and instant notifications using Socket.io and WebSocket technologies.",
      "Designed and implemented a flexible Role-Based Access Control (RBAC) system to manage permissions across channels, servers, and enterprise client workspaces.",
      "Worked closely with product managers, designers, and QA engineers throughout the software development lifecycle to deliver high-quality features on schedule."
    ]
  },
  {
    id: "brillar",
    company: "Brillar",
    role: "Full Stack Developer",
    period: "Sep 2021 – Nov 2023",
    summary: "Developed and maintained scalable web applications using Node.js, React.js, and MongoDB in an Agile development environment.",
    details: [
      "Built RESTful APIs and integrated Redis Streams and Socket.io to support real-time event processing and low-latency data delivery.",
      "Designed and developed an internal device farm platform, including backend services and React.js dashboards, allowing simultaneous execution of automated test cases across multiple devices.",
      "Created reusable and responsive frontend components using React.js and Material UI to improve user experience and development efficiency.",
      "Contributed to automated testing solutions using TOSCA, Appium, and Selenium Grid, helping improve software quality and release reliability."
    ]
  },
  {
    id: "juncture",
    company: "Juncture (Part-Time)",
    role: "Full Stack Developer",
    period: "Jul 2022 – Oct 2023",
    summary: "Led a development team of 10 engineers, coordinating backend and frontend development activities, sprint planning, and technical discussions.",
    details: [
      "Built an AI-powered Applicant Tracking System (ATS) and job portal using Node.js, MongoDB, and React.js to streamline candidate management and recruitment workflows.",
      "Managed AWS infrastructure including EC2, Route 53, Nginx, and GitHub Actions to automate deployment and maintain production environments.",
      "Designed and optimized MongoDB database schemas to support scalable and high-performance application requirements.",
      "Coordinated weekly sprints, conducted code reviews, and mentored junior developers to enforce coding standards."
    ]
  },
  {
    id: "pathway",
    company: "Pathway Plus Ltd",
    role: "Full Stack Developer",
    period: "Apr 2021 – Aug 2021",
    summary: "Developed backend services and REST APIs using Node.js and MongoDB for an online learning platform and content management system.",
    details: [
      "Developed backend services and REST APIs using Node.js and MongoDB for an online learning platform and content management system.",
      "Built responsive frontend applications with React.js and Material UI, focusing on performance, usability, and reusable component design.",
      "Deployed and maintained production applications on AWS Lightsail, configuring Nginx, SSL certificates, and server environments."
    ]
  }
];

export const tools: ToolItem[] = [
  { name: "VS Code", category: "Code Editor", iconName: "Code" },
  { name: "Figma", category: "UI/UX Design", iconName: "PenTool" },
  { name: "Docker", category: "Containerization", iconName: "Box" },
  { name: "AWS", category: "Cloud Hosting", iconName: "Cloud" },
  { name: "Git & GitHub", category: "Version Control", iconName: "GitBranch" },
  { name: "Redis", category: "Caching & Streams", iconName: "Database" },
  { name: "Nginx", category: "Reverse Proxy", iconName: "Cpu" },
  { name: "MongoDB", category: "NoSQL Database", iconName: "Layers" }
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is your primary tech stack?",
    answer: "I specialize in the Node.js/TypeScript ecosystem. For frontends, I build with React.js, Next.js, and Redux. For backends, I utilize Express.js and Nest.js, alongside MongoDB and PostgreSQL databases. I am also fluent in Go and Python."
  },
  {
    id: "faq-2",
    question: "Do you have experience with real-time systems?",
    answer: "Yes, heavily! I've developed real-time messaging services (with threads, emojis, and notifications) using Socket.io and WebSockets at Genesiv. I also integrated Redis Streams to process low-latency, real-time device farm test reports at Brillar."
  },
  {
    id: "faq-3",
    question: "How do you manage deployments and cloud servers?",
    answer: "I containerize web applications with Docker and configure Nginx reverse proxies with SSL certificates. I deploy and monitor these workloads on AWS (EC2, Lightsail) and use GitHub Actions to run automated testing (Jest/Supertest) and CI/CD deployment pipelines."
  },
  {
    id: "faq-4",
    question: "What is your approach to code quality and team collaboration?",
    answer: "I am a strong advocate of test-driven principles (using Jest) and thorough code reviews. At Juncture, I led a team of 10 developers where we practiced Agile Scrum methodology, sprint planning, and technical documentation to ensure clean, maintainable code architectures."
  },
  {
    id: "faq-5",
    question: "Are you open to full-time opportunities or freelance work?",
    answer: "Yes, I am available for full-time fullstack engineer positions and custom freelance developments. You can outline your project requirements, timeline, and budget in the 'Hire Me' form below, and I will get back to you within 24 hours!"
  }
];
