/* ============================================================
   src/App.jsx
   Root application component.
   Assembles layout + all sections in order.
   Initializes global hooks (scroll reveal, scroll progress).
   ============================================================ */

import { useEffect } from "react";
import { useGlobalScrollReveal } from "./hooks/useScrollReveal";
import { META } from "./constants/data";

// ── Layout ──────────────────────────────────────────────────
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// ── Sections ────────────────────────────────────────────────
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import GitHub from "./components/sections/GitHub";
import Contact from "./components/sections/Contact";

// ─── App ─────────────────────────────────────────────────────
export default function App() {

  // ── Initialize global scroll reveal ───────────────────────
  // Observes every .reveal element across all sections
  useGlobalScrollReveal({ threshold: 0.12, triggerOnce: true });

  // ── Update document meta on mount ─────────────────────────
  useEffect(() => {
    // Page title
    document.title = META.title;

    // Meta description
    const metaDesc = document.querySelector("meta[name='description']")
      ?? Object.assign(document.createElement("meta"), { name: "description" });
    metaDesc.content = META.description;
    document.head.appendChild(metaDesc);

    // Meta keywords
    const metaKeys = document.querySelector("meta[name='keywords']")
      ?? Object.assign(document.createElement("meta"), { name: "keywords" });
    metaKeys.content = META.keywords;
    document.head.appendChild(metaKeys);

    // Open Graph tags
    const ogTags = [
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "og:type", content: "website" },
    ];

    ogTags.forEach(({ property, content }) => {
      const tag = document.querySelector(`meta[property='${property}']`)
        ?? Object.assign(document.createElement("meta"), { property });
      tag.content = content;
      document.head.appendChild(tag);
    });
  }, []);

  return (
    // Outer wrapper — sets base font + color vars
    <div
      className="min-h-screen bg-(--bg-primary) text-(--text-primary)"
      style={{ fontFamily: "var(--font-body)" }}
    >

      {/* ── Fixed navigation ── */}
      <Navbar />

      {/* ── Main content ── */}
      <main id="main-content" aria-label="Portfolio content">

        {/* 1. Hero — full viewport intro */}
        <Hero />

        {/* 2. About — story, cards, timeline */}
        <About />

        {/* 3. Skills — animated progress bars */}
        <Skills />

        {/* 4. Projects — featured + grid */}
        <Projects />

        {/* 5. GitHub — live stats + heatmap */}
        <GitHub />

        {/* 6. Contact — form + info */}
        <Contact />

      </main>

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}