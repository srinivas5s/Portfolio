// ─── Personal Info ───────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Srinivas",
  lastName: "Senapati",       // update with your last name
  role: "Full Stack Developer | AI/ML Engineer",
  tagline: "Building scalable web apps today, learning AI for tomorrow.",
  bio: [
    "I'm a full stack developer specializing in the MERN stack — passionate about building products that are both technically excellent and genuinely useful to people.",
    "Currently exploring the intersection of AI and web development: integrating LLMs, building intelligent workflows, and turning complex ideas into clean, performant interfaces.",
  ],
  location: "India",
  locationDetail: "Open to Remote & Relocation",
  availability: true,        // controls the "Available for Work" badge
  email: "work.srinivas.dev@gmail.com",
  resumeUrl: "/resume.pdf",  // place your resume in /public/resume.pdf

  // Social links
  socials: {
    github: "https://github.com/srinivas5s",
    linkedin: "https://www.linkedin.com/in/p-srinivas-senapati-6a0207251/",
    instagram: "https://www.instagram.com/_.srinu_._",
  },
};

// ─── Typewriter Roles ────────────────────────────────────────
// These cycle in the hero section typewriter animation
export const TYPEWRITER_ROLES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "AI/ML Engineer",
  "Problem Solver",
];

// ─── Stats — shown in About section ─────────────────────────
export const STATS = [
  { value: "3+", label: "Years Coding" },
  { value: "4+", label: "Projects Built" },
  { value: "8+", label: "Technologies" },
  { value: "∞", label: "Curiosity" },
];

// ─── About Cards ────────────────────────────────────────────
export const ABOUT_CARDS = [
  {
    icon: "⚡",
    title: "MERN Stack Development",
    desc: "Building full-stack web apps using MongoDB, Express, React, and Node.js.",
  },
  {
    icon: "🤖",
    title: "AI Learning Journey",
    desc: "Currently exploring AI concepts and learning how to integrate AI into web apps.",
  },
  {
    icon: "🧠",
    title: "Problem Solving",
    desc: "Strong focus on logic building, DSA, and writing clean, maintainable code.",
  },
  {
    icon: "📐",
    title: "Frontend Focus",
    desc: "Creating responsive and user-friendly interfaces with attention to UI/UX.",
  },
];

// ─── Skills ─────────────────────────────────────────────────
// Each category has a color used for the card accent border
export const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "C", logo: "/assets/c.png" },
      { name: "C++", logo: "/assets/cpp.png" },
      { name: "JavaScript", logo: "/assets/javascript.png" },
      { name: "TypeScript", logo: "/assets/typescript.png" },
      { name: "HTML", logo: "/assets/html.png" },
      { name: "CSS", logo: "/assets/css.png" },
      { name: "Python", logo: "/assets/python.png" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React", logo: "/assets/react.png" },
      { name: "Node.js", logo: "/assets/nodejs.png" },
      { name: "Express", logo: "/assets/express.png" },
      { name: "Tailwind", logo: "/assets/tailwind.png" },
      { name: "Bootstrap", logo: "/assets/bootstrap.png" },
      { name: "Redux", logo: "/assets/redux.png" },
      { name: "NumPy", logo: "/assets/numpy.png" },
      { name: "Pandas", logo: "/assets/pandas.png" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", logo: "/assets/mongodb.png" },
      { name: "MySQL", logo: "/assets/mysql.png" },
      { name: "Firebase", logo: "/assets/firebase.png" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", logo: "/assets/git.png" },
      { name: "GitHub", logo: "/assets/github.png" },
      { name: "VS Code", logo: "/assets/vscode.png" },
      { name: "Jupyter", logo: "/assets/jupyter.png" },
      { name: "Cursor", logo: "/assets/cursor.png" },
      { name: "Postman", logo: "/assets/postman.png" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "Chatgpt", logo: "/assets/chatgpt.png" },
      { name: "Claude", logo: "/assets/claude.png" },
      { name: "DeepSeek", logo: "/assets/deepseek.png" },
      { name: "Gemini", logo: "/assets/gemini.png" },
      { name: "Perplexity", logo: "/assets/perplexity.png" },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────
// featured: true → shown first; all projects shown in grid
export const PROJECTS = [
  // {
  //   id: "food-delivery",
  //   featured: true,
  //   emoji: "🍔",
  //   accentColor: "#FF6B35",
  //   title: "NomNom — Food Delivery Platform",
  //   shortDesc: "Full-stack food ordering platform with real-time order tracking.",
  //   longDesc:
  //     "Built a production-ready food delivery app with restaurant dashboards, customer ordering flow, real-time order status updates via Socket.io, and Stripe payment integration. Features role-based auth for admins, restaurants, and customers.",
  //   stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Stripe"],
  //   highlights: [
  //     "Real-time order tracking with Socket.io",
  //     "Role-based auth (Admin / Restaurant / Customer)",
  //     "Stripe payment gateway integration",
  //     "Restaurant analytics dashboard",
  //   ],
  //   github: "https://github.com/yourusername/nomnom",
  //   live:   "https://nomnom.vercel.app",
  //   status: "Live",  // "Live" | "In Progress" | "Archived"
  // },
  {
    id: "E-learning",
    featured: true,
    emoji: "🤖",
    accentColor: "#7B61FF",
    title: "LearnAI — Adaptive E-Learning",
    shortDesc: "A Learning platform that adapts to your progress.",
    longDesc:
      "An intelligent e-learning platform integrating OpenAI GPT-4 to generate personalized quizzes, summarize lecture content, and adapt course difficulty based on user performance analytics.",
    stack: ["React", "Node.js", "MongoDB"],
    highlights: [
      "GPT-4 powered quiz generation",
      "Adaptive difficulty algorithm",
      "Progress analytics with Chart.js",
      "Course content summarization with AI",
    ],
    github: "https://github.com/srinivas5s/LMS",
    live: "https://srinivas-senapati.vercel.app",
    status: "In Progress",
  },
  // {
  //   id: "farm-management",
  //   featured: false,
  //   emoji: "🐔",
  //   accentColor: "#E8FF47",
  //   title: "FarmLog — Poultry Dashboard",
  //   shortDesc: "Farm management system with analytics and batch tracking.",
  //   longDesc:
  //     "A specialized dashboard for poultry farm management. Tracks bird batches, feeding schedules, mortality rates, and financial summaries. Built with data visualization for daily farm analytics.",
  //   stack: ["MERN Stack", "Chart.js", "JWT", "Tailwind CSS"],
  //   highlights: [
  //     "Batch lifecycle tracking",
  //     "Automated feeding schedule alerts",
  //     "Financial P&L reports",
  //     "Mobile-responsive dashboard",
  //   ],
  //   github: "https://github.com/yourusername/farmlog",
  //   live:   "https://farmlog.vercel.app",
  //   status: "Live",
  // },
  // {
  //   id: "dev-tools",
  //   featured: false,
  //   emoji: "🛠️",
  //   accentColor: "#00D4AA",
  //   title: "DevKit — Developer Utilities",
  //   shortDesc: "A collection of everyday dev tools built into one app.",
  //   longDesc:
  //     "A utility web app with tools like JSON formatter, regex tester, color picker, base64 encoder/decoder, and markdown previewer. Built for developers who want quick access without visiting 10 different sites.",
  //   stack: ["React", "Tailwind CSS", "Vite"],
  //   highlights: [
  //     "10+ developer utility tools",
  //     "Offline-capable PWA",
  //     "Zero backend — runs entirely in browser",
  //     "Dark / light mode",
  //   ],
  //   github: "https://github.com/yourusername/devkit",
  //   live:   "https://devkit.vercel.app",
  //   status: "Live",
  // },
];

// ─── GitHub Stats ─────────────────────────────────────────────
// These are display values — connect GitHub API in GitHub.jsx for real data
export const GITHUB_STATS = [
  { value: "3+", label: "Contributions", icon: "📦" },
  { value: "5+", label: "Repositories", icon: "🗂️" },
  { value: "4+", label: "Languages", icon: "🌐" },
  { value: "20+", label: "Commits", icon: "🔁" },
];

export const GITHUB_USERNAME = "srinivas5s"; // used to build profile links

// ─── Experience / Timeline ───────────────────────────────────
// Optional section — remove if you're a fresher with no experience
export const EXPERIENCE = [
  {
    role: "Full Stack Developer Intern",
    company: "BNspire Pvt. Ltd.",
    period: "10 May 2026 - 10 June 2026",
    location: "Remote",
    desc: "Built RESTful APIs with Node.js/Express, developed React dashboards, and integrated third-party payment APIs. Improved API response time by 30% through query optimization.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
  },
  // Add more experience objects as needed
];

// ─── Education ───────────────────────────────────────────────
export const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Trident Academy of Technology, Bhubaneswar",
    period: "2025 – Present",
    grade: "9.1 SGPA",
    desc: "Focused on data structures, algorithms, and software engineering principles.",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Academy of Technocrats, Berhampur",
    period: "2022 – 2025",
    grade: "8.4 CGPA",
    desc: "Studied fundamental concepts in computer science and software development.",
  },
];

// ─── Contact Info ─────────────────────────────────────────────
export const CONTACT_INFO = [
  {
    icon: "✉️",
    label: "Email",
    value: "work.srinivas.dev@gmail.com",
    href: "mailto:work.srinivas.dev@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/p-srinivas-senapati",
    href: "https://www.linkedin.com/in/p-srinivas-senapati-6a0207251/",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/srinivas5s",
    href: "https://github.com/srinivas5s",
  },
];

// ─── Navigation Links ────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

// ─── Meta / SEO ───────────────────────────────────────────────
export const META = {
  title: "Srinivas Senapati — MERN Stack Developer | AI/ML Engineer",
  description:
    "Fresher MERN Stack Developer skilled in building full-stack web applications and exploring AI integration. Open to opportunities.",
  keywords: "full stack developer, MERN stack, React developer, Node.js, AI, portfolio",
  ogImage: "/og-image.png",  // place in /public/
};