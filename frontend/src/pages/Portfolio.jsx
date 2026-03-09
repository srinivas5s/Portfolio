import { useState, useEffect, useRef } from "react";

// ─── Fonts & Icons via CDN (injected once) ───────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("portfolio-styles")) return;
  const link = document.createElement("link");
  link.id = "portfolio-styles";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
  document.head.appendChild(link);

  const style = document.createElement("style");
  style.id = "portfolio-css";
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --cream: #F7F4EF;
      --ink: #1A1612;
      --rust: #C85A2E;
      --sage: #7A9E87;
      --gold: #D4A847;
      --mist: #E8E2D9;
      --warm-white: #FDFAF6;
      font-size: 16px;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--cream); color: var(--ink); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::selection { background: var(--rust); color: white; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--rust); border-radius: 3px; }

    /* Scroll Progress */
    #scroll-progress {
      position: fixed; top: 0; left: 0; height: 3px;
      background: linear-gradient(90deg, var(--rust), var(--gold));
      z-index: 9999; transition: width 0.1s;
    }

    /* Nav */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.2rem 4rem;
      background: rgba(247,244,239,0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(200,90,46,0.12);
      transition: all 0.3s;
    }
    .nav-logo {
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem;
      color: var(--ink); letter-spacing: -0.03em; text-decoration: none;
    }
    .nav-logo span { color: var(--rust); }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; }
    .nav-links a {
      font-size: 0.875rem; font-weight: 500; color: var(--ink);
      text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase;
      position: relative; padding-bottom: 2px;
      transition: color 0.2s;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 0; height: 1.5px; background: var(--rust);
      transition: width 0.3s ease;
    }
    .nav-links a:hover { color: var(--rust); }
    .nav-links a:hover::after { width: 100%; }
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--ink); transition: all 0.3s; }

    /* Hero */
    #hero {
      min-height: 100vh; display: flex; align-items: center;
      padding: 8rem 4rem 4rem;
      position: relative; overflow: hidden;
    }
    .hero-bg-shape {
      position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.25; pointer-events: none;
    }
    .hero-content { position: relative; z-index: 1; max-width: 820px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.4rem 1rem; border-radius: 100px;
      border: 1px solid var(--rust); color: var(--rust);
      font-size: 0.8rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
      margin-bottom: 1.5rem;
      animation: fadeUp 0.6s ease both;
    }
    .hero-badge-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--rust); animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
    .hero-name {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: clamp(3.5rem, 8vw, 7rem); line-height: 0.95;
      letter-spacing: -0.04em; color: var(--ink);
      animation: fadeUp 0.7s 0.1s ease both;
    }
    .hero-name-accent { color: var(--rust); display: block; }
    .hero-title {
      font-size: 1.15rem; font-weight: 300; color: #6B6560;
      margin: 1.5rem 0 0.75rem; letter-spacing: 0.01em;
      animation: fadeUp 0.7s 0.2s ease both;
    }
    .typewriter-wrap {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: clamp(1.1rem, 2.5vw, 1.5rem); color: var(--sage);
      min-height: 2.2rem; animation: fadeUp 0.7s 0.3s ease both;
    }
    .typewriter-cursor { animation: blink 0.8s infinite; color: var(--rust); }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .hero-tagline {
      font-size: 1rem; color: #7A7470; max-width: 480px; line-height: 1.7;
      margin: 1.5rem 0 2.5rem; animation: fadeUp 0.7s 0.4s ease both;
    }
    .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeUp 0.7s 0.5s ease both; }
    .btn-primary {
      padding: 0.85rem 2rem; border-radius: 6px;
      background: var(--ink); color: white;
      font-weight: 500; font-size: 0.9rem; letter-spacing: 0.02em;
      text-decoration: none; border: none; cursor: pointer;
      transition: all 0.25s; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-primary:hover { background: var(--rust); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,90,46,0.3); }
    .btn-outline {
      padding: 0.85rem 2rem; border-radius: 6px;
      background: transparent; color: var(--ink);
      font-weight: 500; font-size: 0.9rem; letter-spacing: 0.02em;
      text-decoration: none; cursor: pointer;
      border: 1.5px solid var(--ink); transition: all 0.25s;
      display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-outline:hover { background: var(--ink); color: white; transform: translateY(-2px); }
    .hero-socials { display: flex; gap: 1.2rem; margin-top: 2.5rem; animation: fadeUp 0.7s 0.6s ease both; }
    .social-link {
      width: 44px; height: 44px; border-radius: 50%;
      border: 1.5px solid var(--mist); display: flex; align-items: center; justify-content: center;
      color: var(--ink); text-decoration: none; font-size: 0.9rem; font-weight: 600;
      transition: all 0.25s;
    }
    .social-link:hover { border-color: var(--rust); color: var(--rust); transform: translateY(-3px); box-shadow: 0 6px 20px rgba(200,90,46,0.2); }
    .hero-scroll-hint {
      position: absolute; bottom: 2.5rem; left: 4rem;
      display: flex; align-items: center; gap: 0.75rem;
      font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
      color: #9A9490; animation: fadeUp 1s 0.8s ease both;
    }
    .scroll-line { width: 40px; height: 1px; background: #9A9490; }

    /* Sections */
    section { padding: 6rem 4rem; }
    .section-label {
      font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--rust); font-weight: 600; margin-bottom: 0.75rem;
      display: flex; align-items: center; gap: 0.75rem;
    }
    .section-label::before { content: ''; display: block; width: 2rem; height: 1.5px; background: var(--rust); }
    .section-title {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.03em;
      color: var(--ink); line-height: 1.1; margin-bottom: 1rem;
    }
    .section-subtitle { font-size: 1rem; color: #7A7470; max-width: 520px; line-height: 1.7; margin-bottom: 3rem; }

    /* About */
    #about { background: var(--warm-white); }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
    .about-text p { font-size: 1rem; color: #4A4540; line-height: 1.8; margin-bottom: 1.25rem; }
    .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .about-card {
      padding: 1.5rem; border-radius: 10px; background: var(--cream);
      border: 1px solid var(--mist); transition: all 0.3s;
    }
    .about-card:hover { border-color: var(--rust); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
    .about-card-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
    .about-card h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 0.4rem; }
    .about-card p { font-size: 0.85rem; color: #7A7470; line-height: 1.5; }
    .about-stats { display: flex; gap: 2rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--mist); }
    .stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 2rem; color: var(--rust); display: block; }
    .stat-label { font-size: 0.8rem; color: #9A9490; }

    /* Skills */
    #skills { background: var(--cream); }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
    .skill-category {
      padding: 2rem; border-radius: 12px; background: var(--warm-white);
      border: 1px solid var(--mist); transition: all 0.3s;
    }
    .skill-category:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.08); transform: translateY(-4px); }
    .skill-cat-title {
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--rust);
      margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--mist);
    }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .skill-tag {
      padding: 0.4rem 0.9rem; border-radius: 100px; font-size: 0.82rem; font-weight: 500;
      background: var(--mist); color: var(--ink); transition: all 0.2s; cursor: default;
    }
    .skill-tag:hover { background: var(--rust); color: white; transform: scale(1.05); }

    /* Projects */
    #projects { background: var(--warm-white); }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
    .project-card {
      border-radius: 14px; overflow: hidden;
      background: var(--cream); border: 1px solid var(--mist);
      transition: all 0.35s; cursor: pointer;
    }
    .project-card:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(0,0,0,0.12); border-color: var(--rust); }
    .project-img {
      height: 200px; display: flex; align-items: center; justify-content: center;
      font-size: 3rem; position: relative; overflow: hidden;
    }
    .project-img-gradient {
      position: absolute; inset: 0; opacity: 0.15;
    }
    .project-body { padding: 1.75rem; }
    .project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
    .project-tag {
      padding: 0.25rem 0.7rem; border-radius: 100px; font-size: 0.72rem; font-weight: 500;
      border: 1px solid var(--mist); color: #6B6560;
    }
    .project-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem; }
    .project-desc { font-size: 0.875rem; color: #6B6560; line-height: 1.65; margin-bottom: 1.25rem; }
    .project-links { display: flex; gap: 0.75rem; }
    .project-link {
      padding: 0.45rem 1rem; border-radius: 6px; font-size: 0.8rem; font-weight: 500;
      text-decoration: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem;
    }
    .project-link-gh { background: var(--ink); color: white; }
    .project-link-gh:hover { background: var(--rust); }
    .project-link-live { border: 1.5px solid var(--mist); color: var(--ink); }
    .project-link-live:hover { border-color: var(--sage); color: var(--sage); }

    /* GitHub */
    #github { background: var(--cream); }
    .github-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
    .github-stat-card {
      padding: 2rem; border-radius: 12px; background: var(--warm-white);
      border: 1px solid var(--mist); text-align: center; transition: all 0.3s;
    }
    .github-stat-card:hover { transform: translateY(-4px); border-color: var(--sage); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
    .github-stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 2.5rem; color: var(--sage); }
    .github-stat-label { font-size: 0.8rem; color: #9A9490; margin-top: 0.3rem; }
    .contrib-grid { display: grid; grid-template-columns: repeat(52, 1fr); gap: 3px; margin-top: 2.5rem; }
    .contrib-week { display: flex; flex-direction: column; gap: 3px; }
    .contrib-day {
      width: 12px; height: 12px; border-radius: 2px;
      transition: transform 0.15s;
    }
    .contrib-day:hover { transform: scale(1.5); }

    /* Contact */
    #contact { background: var(--warm-white); }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
    .contact-info-item { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.75rem; }
    .contact-info-icon {
      width: 44px; height: 44px; border-radius: 10px; background: var(--mist);
      display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
    }
    .contact-info-label { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: #9A9490; }
    .contact-info-value { font-weight: 500; color: var(--ink); font-size: 0.95rem; }
    .contact-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group label { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; color: #6B6560; }
    .form-group input, .form-group textarea {
      padding: 0.85rem 1rem; border-radius: 8px;
      border: 1.5px solid var(--mist); background: var(--cream);
      font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--ink);
      transition: border-color 0.2s; outline: none; resize: vertical;
    }
    .form-group input:focus, .form-group textarea:focus { border-color: var(--rust); }
    .form-group textarea { min-height: 120px; }

    /* Footer */
    footer {
      background: var(--ink); color: var(--mist);
      padding: 2.5rem 4rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap;
    }
    .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem; letter-spacing: -0.03em; }
    .footer-logo span { color: var(--rust); }
    .footer-copy { font-size: 0.8rem; opacity: 0.5; }
    .footer-socials { display: flex; gap: 1rem; }
    .footer-social { color: var(--mist); opacity: 0.6; text-decoration: none; font-size: 0.82rem; font-weight: 500; transition: opacity 0.2s; }
    .footer-social:hover { opacity: 1; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }

    /* Mobile */
    @media (max-width: 768px) {
      nav { padding: 1rem 1.5rem; }
      .nav-links { display: none; flex-direction: column; position: fixed; inset: 0; background: var(--cream); justify-content: center; align-items: center; gap: 2rem; font-size: 1.2rem; }
      .nav-links.open { display: flex; }
      .hamburger { display: flex; z-index: 1001; position: relative; }
      #hero { padding: 7rem 1.5rem 4rem; }
      section { padding: 4rem 1.5rem; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
      .about-cards { grid-template-columns: 1fr 1fr; }
      footer { padding: 2rem 1.5rem; flex-direction: column; gap: 1rem; text-align: center; }
      .hero-scroll-hint { left: 1.5rem; }
      .contrib-grid { display: none; }
    }
  `;
  document.head.appendChild(style);
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { cat: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"] },
  { cat: "Database", items: ["MongoDB", "SQL", "Mongoose", "Firebase"] },
  { cat: "Tools & DevOps", items: ["Git", "VS Code", "Postman", "Vite", "Vercel"] },
];

const PROJECTS = [
  {
    emoji: "🍔", bg: "#C85A2E",
    title: "Food Delivery Platform",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    desc: "Full-stack food ordering platform with restaurant dashboards, real-time order tracking, and payment integration.",
    gh: "#", live: "#",
  },
  {
    emoji: "🤖", bg: "#7A9E87",
    title: "AI-Powered E-Learning",
    stack: ["React", "Node.js", "AI APIs", "MongoDB"],
    desc: "Intelligent learning platform that adapts course content based on individual user progress and performance analytics.",
    gh: "#", live: "#",
  },
  {
    emoji: "🐔", bg: "#D4A847",
    title: "Farm Management System",
    stack: ["MERN Stack", "Chart.js", "JWT"],
    desc: "Dashboard to track poultry batches, monitor feeding schedules, and visualize daily farm analytics.",
    gh: "#", live: "#",
  },
];

const ABOUT_CARDS = [
  { icon: "🧠", title: "Problem Solving", desc: "Breaking complex challenges into elegant, maintainable solutions." },
  { icon: "⚡", title: "Web Development", desc: "MERN stack expertise — from REST APIs to polished frontends." },
  { icon: "🤖", title: "AI & ML", desc: "Exploring LLMs, AI APIs, and building intelligent applications." },
  { icon: "📚", title: "Continuous Learning", desc: "Always staying ahead with new frameworks and best practices." },
];

const TYPEWRITER_TEXTS = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "AI Enthusiast",
  "Problem Solver",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useTypewriter(texts, speed = 80) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx % texts.length];
    const delay = isDeleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length === 0) {
          setIsDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [display, isDeleting, idx, texts, speed]);

  return display;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Contribution Graph (decorative) ─────────────────────────────────────────
function ContribGraph() {
  const levels = [0, 1, 2, 3, 4];
  const colors = {
    0: "#EDE8E0", 1: "#C3D9C7", 2: "#7A9E87", 3: "#4E7A5E", 4: "#2D5A42",
  };
  const weeks = Array.from({ length: 52 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => {
      const r = Math.random();
      return r < 0.35 ? 0 : r < 0.55 ? 1 : r < 0.72 ? 2 : r < 0.87 ? 3 : 4;
    })
  );

  return (
    <div style={{ overflowX: "auto", marginTop: "2.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(52, 14px)", gap: "3px", width: "fit-content" }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {week.map((lvl, di) => (
              <div
                key={di}
                title={`${lvl} contributions`}
                style={{
                  width: 12, height: 12, borderRadius: 2,
                  background: colors[lvl], transition: "transform 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.5)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Portfolio ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const typed = useTypewriter(TYPEWRITER_TEXTS);
  useScrollReveal();

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--cream)", color: "var(--ink)" }}>
      {/* Scroll Progress */}
      <div id="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* ── Nav ── */}
      <nav>
        <a className="nav-logo" href="#hero">
          dev<span>.</span>folio
        </a>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["hero", "about", "skills", "projects", "contact"].map((s) => (
            <li key={s}>
              <a href={`#${s}`} onClick={(e) => { e.preventDefault(); scrollTo(s); }}>
                {s === "hero" ? "Home" : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero">
        {/* BG decorations */}
        <div className="hero-bg-shape" style={{ width: 600, height: 600, background: "var(--rust)", top: -100, right: -150 }} />
        <div className="hero-bg-shape" style={{ width: 400, height: 400, background: "var(--sage)", bottom: -80, left: -100 }} />
        <div className="hero-bg-shape" style={{ width: 250, height: 250, background: "var(--gold)", top: "40%", right: "30%" }} />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Available for Work
          </div>

          <h1 className="hero-name">
            Hello, I'm
            <span className="hero-name-accent">Srinivas.</span>
          </h1>

          <p className="hero-title">Based in India · Open to Remote</p>

          <div className="typewriter-wrap">
            {typed}<span className="typewriter-cursor">|</span>
          </div>

          <p className="hero-tagline">
            I build scalable web applications and AI-powered products that solve real problems — with clean code and crafted UI.
          </p>

          <div className="hero-cta">
            <a className="btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>
              View Projects →
            </a>
            <a className="btn-outline" href="#">
              Download Resume ↓
            </a>
          </div>

          <div className="hero-socials">
            {[
              { label: "GH", href: "#", title: "GitHub" },
              { label: "Li", href: "#", title: "LinkedIn" },
              { label: "@", href: "#", title: "Email" },
            ].map((s) => (
              <a key={s.label} className="social-link" href={s.href} title={s.title}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          Scroll to explore
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="section-label reveal">About Me</div>
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title reveal">Crafting digital experiences with purpose.</h2>
            <p className="reveal reveal-delay-1">
              I'm a passionate full stack developer specializing in MERN stack development. I love building scalable, performant web applications from the ground up — everything from the database schema to the pixel-perfect UI.
            </p>
            <p className="reveal reveal-delay-2">
              Currently expanding into AI-powered products — integrating LLMs, AI APIs, and smart automation into real-world applications. I believe the best software is both technically excellent and genuinely useful.
            </p>
            <div className="about-stats reveal reveal-delay-3">
              <div>
                <span className="stat-num">3+</span>
                <span className="stat-label">Years Coding</span>
              </div>
              <div>
                <span className="stat-num">15+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div>
                <span className="stat-num">∞</span>
                <span className="stat-label">Curiosity</span>
              </div>
            </div>
          </div>

          <div className="about-cards reveal reveal-delay-1">
            {ABOUT_CARDS.map((c, i) => (
              <div key={i} className="about-card">
                <div className="about-card-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills">
        <div className="section-label reveal">Expertise</div>
        <h2 className="section-title reveal">Technologies I work with.</h2>
        <p className="section-subtitle reveal">Tools and languages I use to bring ideas to life — from backend APIs to polished frontends.</p>

        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div key={i} className={`skill-category reveal reveal-delay-${Math.min(i + 1, 3)}`}>
              <div className="skill-cat-title">{cat.cat}</div>
              <div className="skill-tags">
                {cat.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects">
        <div className="section-label reveal">Work</div>
        <h2 className="section-title reveal">Things I've built.</h2>
        <p className="section-subtitle reveal">A selection of projects across full stack web development and AI integration.</p>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className={`project-card reveal reveal-delay-${Math.min(i + 1, 3)}`}>
              <div className="project-img" style={{ background: `${p.bg}18` }}>
                <div className="project-img-gradient" style={{ background: p.bg }} />
                <span style={{ fontSize: "3.5rem", position: "relative" }}>{p.emoji}</span>
              </div>
              <div className="project-body">
                <div className="project-stack">
                  {p.stack.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-links">
                  <a href={p.gh} className="project-link project-link-gh">GitHub ↗</a>
                  <a href={p.live} className="project-link project-link-live">Live Demo →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GitHub ── */}
      <section id="github">
        <div className="section-label reveal">Open Source</div>
        <h2 className="section-title reveal">GitHub Activity.</h2>

        <div className="github-stats">
          {[
            { num: "200+", label: "Contributions this year" },
            { num: "15+", label: "Public Repositories" },
            { num: "4+", label: "Languages Used" },
            { num: "50+", label: "Commits this month" },
          ].map((s, i) => (
            <div key={i} className={`github-stat-card reveal reveal-delay-${Math.min(i + 1, 3)}`}>
              <div className="github-stat-num">{s.num}</div>
              <div className="github-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <ContribGraph />
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="section-label reveal">Get In Touch</div>
        <h2 className="section-title reveal">Let's work together.</h2>

        <div className="contact-grid">
          <div className="reveal">
            <p style={{ color: "#6B6560", lineHeight: 1.7, marginBottom: "2rem" }}>
              Whether you have a project in mind, a role to discuss, or just want to connect — I'm always happy to talk. Drop me a message and I'll get back to you.
            </p>

            {[
              { icon: "✉️", label: "Email", value: "hello@developer.com" },
              { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/developer" },
              { icon: "🐙", label: "GitHub", value: "github.com/developer" },
            ].map((item) => (
              <div key={item.label} className="contact-info-item">
                <div className="contact-info-icon">{item.icon}</div>
                <div>
                  <div className="contact-info-label">{item.label}</div>
                  <div className="contact-info-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form reveal reveal-delay-1">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text" placeholder="John Doe" value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email" placeholder="john@example.com" value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Tell me about your project…" value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>
            <button
              className="btn-primary"
              onClick={handleSend}
              style={{ marginTop: "0.5rem", justifyContent: "center" }}
            >
              {sent ? "Message Sent! ✓" : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-logo">dev<span>.</span>folio</div>
        <div className="footer-copy">© 2026 Developer. All rights reserved.</div>
        <div className="footer-socials">
          {["GitHub", "LinkedIn", "Email"].map((s) => (
            <a key={s} href="#" className="footer-social">{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}