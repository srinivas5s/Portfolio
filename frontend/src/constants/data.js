/* ============================================================
   src/constants/data.js
   Central data store — all portfolio content lives here.
   Update this file to personalize the portfolio.
   ============================================================ */

// ─── Personal Info ───────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Srinivas",
  lastName: "Kumar",       // update with your last name
  role: "Full Stack Developer",
  tagline: "I build scalable web apps & AI-powered products.",
  bio: [
    "I'm a full stack developer specializing in the MERN stack — passionate about building products that are both technically excellent and genuinely useful to people.",
    "Currently exploring the intersection of AI and web development: integrating LLMs, building intelligent workflows, and turning complex ideas into clean, performant interfaces.",
  ],
  location: "India",
  locationDetail: "Open to Remote & Relocation",
  availability: true,        // controls the "Available for Work" badge
  email: "hello@srinivas.dev",
  resumeUrl: "/resume.pdf",  // place your resume in /public/resume.pdf

  // Social links
  socials: {
    github:   "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter:  "https://twitter.com/yourusername",  // optional
  },
};

// ─── Typewriter Roles ────────────────────────────────────────
// These cycle in the hero section typewriter animation
export const TYPEWRITER_ROLES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "AI Integration Specialist",
  "Problem Solver",
  "Open Source Contributor",
];

// ─── Stats — shown in About section ─────────────────────────
export const STATS = [
  { value: "3+",  label: "Years Coding"    },
  { value: "15+", label: "Projects Shipped" },
  { value: "8+",  label: "Tech Stack"       },
  { value: "∞",   label: "Curiosity"        },
];

// ─── About Cards ────────────────────────────────────────────
export const ABOUT_CARDS = [
  {
    icon: "⚡",
    title: "Full Stack Engineering",
    desc:  "End-to-end MERN stack — REST APIs, auth, databases, and pixel-perfect frontends.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc:  "Building intelligent apps with LLMs, AI APIs, and smart automation workflows.",
  },
  {
    icon: "🧠",
    title: "System Thinking",
    desc:  "Breaking complex problems into clean, maintainable, and scalable architecture.",
  },
  {
    icon: "📐",
    title: "UI Craft",
    desc:  "Obsessive about details — typography, spacing, motion, and user experience.",
  },
];

// ─── Skills ─────────────────────────────────────────────────
// Each category has a color used for the card accent border
export const SKILLS = [
  {
    category: "Frontend",
    color: "#E8FF47",   // lime
    icon: "◈",
    items: [
      { name: "React",        level: 90 },
      { name: "JavaScript",   level: 88 },
      { name: "Tailwind CSS", level: 85 },
      { name: "HTML5 / CSS3", level: 92 },
      { name: "Framer Motion",level: 70 },
    ],
  },
  {
    category: "Backend",
    color: "#7B61FF",   // violet
    icon: "◉",
    items: [
      { name: "Node.js",   level: 85 },
      { name: "Express.js",level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Auth",  level: 80 },
      { name: "Socket.io", level: 65 },
    ],
  },
  {
    category: "Database",
    color: "#FF6B35",   // orange
    icon: "◎",
    items: [
      { name: "MongoDB",   level: 85 },
      { name: "Mongoose",  level: 82 },
      { name: "Firebase",  level: 72 },
      { name: "SQL Basics",level: 60 },
    ],
  },
  {
    category: "AI & Tools",
    color: "#00D4AA",   // teal
    icon: "◇",
    items: [
      { name: "OpenAI API",   level: 75 },
      { name: "LangChain",    level: 60 },
      { name: "Git / GitHub", level: 88 },
      { name: "Postman",      level: 82 },
      { name: "Vite / Vercel",level: 80 },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────
// featured: true → shown first; all projects shown in grid
export const PROJECTS = [
  {
    id: "food-delivery",
    featured: true,
    emoji: "🍔",
    accentColor: "#FF6B35",
    title: "NomNom — Food Delivery Platform",
    shortDesc: "Full-stack food ordering platform with real-time order tracking.",
    longDesc:
      "Built a production-ready food delivery app with restaurant dashboards, customer ordering flow, real-time order status updates via Socket.io, and Stripe payment integration. Features role-based auth for admins, restaurants, and customers.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Stripe"],
    highlights: [
      "Real-time order tracking with Socket.io",
      "Role-based auth (Admin / Restaurant / Customer)",
      "Stripe payment gateway integration",
      "Restaurant analytics dashboard",
    ],
    github: "https://github.com/yourusername/nomnom",
    live:   "https://nomnom.vercel.app",
    status: "Live",  // "Live" | "In Progress" | "Archived"
  },
  {
    id: "ai-elearning",
    featured: true,
    emoji: "🤖",
    accentColor: "#7B61FF",
    title: "LearnAI — Adaptive E-Learning",
    shortDesc: "AI-powered learning platform that adapts to your progress.",
    longDesc:
      "An intelligent e-learning platform integrating OpenAI GPT-4 to generate personalized quizzes, summarize lecture content, and adapt course difficulty based on user performance analytics.",
    stack: ["React", "Node.js", "MongoDB", "OpenAI API", "Chart.js"],
    highlights: [
      "GPT-4 powered quiz generation",
      "Adaptive difficulty algorithm",
      "Progress analytics with Chart.js",
      "Course content summarization with AI",
    ],
    github: "https://github.com/yourusername/learnai",
    live:   "https://learnai.vercel.app",
    status: "In Progress",
  },
  {
    id: "farm-management",
    featured: false,
    emoji: "🐔",
    accentColor: "#E8FF47",
    title: "FarmLog — Poultry Dashboard",
    shortDesc: "Farm management system with analytics and batch tracking.",
    longDesc:
      "A specialized dashboard for poultry farm management. Tracks bird batches, feeding schedules, mortality rates, and financial summaries. Built with data visualization for daily farm analytics.",
    stack: ["MERN Stack", "Chart.js", "JWT", "Tailwind CSS"],
    highlights: [
      "Batch lifecycle tracking",
      "Automated feeding schedule alerts",
      "Financial P&L reports",
      "Mobile-responsive dashboard",
    ],
    github: "https://github.com/yourusername/farmlog",
    live:   "https://farmlog.vercel.app",
    status: "Live",
  },
  {
    id: "dev-tools",
    featured: false,
    emoji: "🛠️",
    accentColor: "#00D4AA",
    title: "DevKit — Developer Utilities",
    shortDesc: "A collection of everyday dev tools built into one app.",
    longDesc:
      "A utility web app with tools like JSON formatter, regex tester, color picker, base64 encoder/decoder, and markdown previewer. Built for developers who want quick access without visiting 10 different sites.",
    stack: ["React", "Tailwind CSS", "Vite"],
    highlights: [
      "10+ developer utility tools",
      "Offline-capable PWA",
      "Zero backend — runs entirely in browser",
      "Dark / light mode",
    ],
    github: "https://github.com/yourusername/devkit",
    live:   "https://devkit.vercel.app",
    status: "Live",
  },
];

// ─── GitHub Stats ─────────────────────────────────────────────
// These are display values — connect GitHub API in GitHub.jsx for real data
export const GITHUB_STATS = [
  { value: "200+", label: "Contributions",   icon: "📦" },
  { value: "15+",  label: "Repositories",    icon: "🗂️" },
  { value: "4+",   label: "Languages",       icon: "🌐" },
  { value: "50+",  label: "Commits / Month", icon: "🔁" },
];

export const GITHUB_USERNAME = "yourusername"; // used to build profile links

// ─── Experience / Timeline ───────────────────────────────────
// Optional section — remove if you're a fresher with no experience
export const EXPERIENCE = [
  {
    role:     "Full Stack Developer Intern",
    company:  "TechStartup Pvt. Ltd.",
    period:   "Jan 2024 – Apr 2024",
    location: "Remote",
    desc:     "Built RESTful APIs with Node.js/Express, developed React dashboards, and integrated third-party payment APIs. Improved API response time by 30% through query optimization.",
    stack:    ["React", "Node.js", "MongoDB", "Express"],
  },
  // Add more experience objects as needed
];

// ─── Education ───────────────────────────────────────────────
export const EDUCATION = [
  {
    degree:  "B.Tech in Computer Science",
    school:  "Your University Name",
    period:  "2021 – 2025",
    grade:   "8.2 CGPA",
    desc:    "Focused on data structures, algorithms, and software engineering principles.",
  },
];

// ─── Contact Info ─────────────────────────────────────────────
export const CONTACT_INFO = [
  {
    icon:  "✉️",
    label: "Email",
    value: "hello@srinivas.dev",
    href:  "mailto:hello@srinivas.dev",
  },
  {
    icon:  "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/yourusername",
    href:  "https://linkedin.com/in/yourusername",
  },
  {
    icon:  "🐙",
    label: "GitHub",
    value: "github.com/yourusername",
    href:  "https://github.com/yourusername",
  },
];

// ─── Navigation Links ────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",     href: "hero"     },
  { label: "About",    href: "about"    },
  { label: "Skills",   href: "skills"   },
  { label: "Projects", href: "projects" },
  { label: "Contact",  href: "contact"  },
];

// ─── Meta / SEO ───────────────────────────────────────────────
export const META = {
  title:       "Srinivas Kumar — Full Stack Developer",
  description: "Full Stack Developer specializing in MERN stack and AI-powered web applications. Based in India, open to remote opportunities.",
  keywords:    "full stack developer, MERN stack, React developer, Node.js, AI, portfolio",
  ogImage:     "/og-image.png",  // place in /public/
};