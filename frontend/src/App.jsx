import { useEffect } from "react";
import { useGlobalScrollReveal } from "./hooks/useScrollReveal";
import { META } from "./constants/data";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import GitHub from "./components/sections/Github";
import Contact from "./components/sections/Contact";

export default function App() {

  useGlobalScrollReveal({ threshold: 0.12, triggerOnce: true });

  useEffect(() => {
    document.title = META.title;

    const metaDesc = document.querySelector("meta[name='description']")
      ?? Object.assign(document.createElement("meta"), { name: "description" });
    metaDesc.content = META.description;
    document.head.appendChild(metaDesc);

    // Meta keywords
    const metaKeys = document.querySelector("meta[name='keywords']")
      ?? Object.assign(document.createElement("meta"), { name: "keywords" });
    metaKeys.content = META.keywords;
    document.head.appendChild(metaKeys);

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
    <div
      className="min-h-screen bg-(--bg-primary) text-(--text-primary)"
      style={{ fontFamily: "var(--font-body)" }}
    >

      <Navbar />

      <main id="main-content" aria-label="Portfolio content">

        <Hero />

        <About />

        <Skills />

        <Projects />

        <GitHub />

        <Contact />

      </main>

      <Footer />

    </div>
  );
}