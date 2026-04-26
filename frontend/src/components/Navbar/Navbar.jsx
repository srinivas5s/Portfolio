/* ============================================================
   src/components/layout/Navbar.jsx
   — Added ThemeToggle button
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, PERSONAL_INFO }    from "../../constants/data";
import { useActiveSection,
         useScrollProgress }           from "../../hooks/useScrollReveal";
import { useTheme }                    from "../../context/ThemeContext";
import Button                          from "../ui/Button";

// ─── Theme Toggle ─────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {/* Sliding pill with icon */}
      <span className="theme-toggle-pill" aria-hidden="true">
        {isDark ? (
          /* Moon icon — currently dark */
          <svg viewBox="0 0 16 16" fill="currentColor"
            className="w-3 h-3 text-[#0A0A0F]">
            <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278z"/>
          </svg>
        ) : (
          /* Sun icon — currently light */
          <svg viewBox="0 0 16 16" fill="currentColor"
            className="w-3 h-3 text-white">
            <path d="M8 11a3 3 0 110-6 3 3 0 010 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.707l1.414-1.415a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .707z"/>
          </svg>
        )}
      </span>

      {/* Track label — hidden visually, for spacing reference */}
      <span className="sr-only">{theme} mode active</span>
    </button>
  );
}

// ─── Logo ─────────────────────────────────────────────────────
function Logo({ onClick }) {
  return (
    <a href="#hero" onClick={onClick}
      className="flex items-center gap-1 group" aria-label="Go to top">
      <span className="font-mono text-(--accent-secondary) text-xl
        transition-transform duration-300 group-hover:-translate-x-0.5"
        aria-hidden="true">&lt;</span>
      <span className="font-display font-bold text-lg tracking-tight
        text-(--text-primary)
        transition-colors duration-200 group-hover:text-(--accent-secondary)">
        {PERSONAL_INFO.name}
      </span>
      <span className="font-mono text-(--accent-secondary) text-xl
        transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true">/&gt;</span>
    </a>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────
function NavLink({ href, label, isActive, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    onClick?.();
  };
  return (
    <li>
      <a href={`#${href}`} onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        className={[
          "relative py-1 text-sm font-medium tracking-wide",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-(--accent-secondary) rounded-sm",
          isActive
            ? "text-(--accent-secondary)"
            : "text-(--text-secondary) hover:text-(--text-primary)",
        ].join(" ")}
      >
        {label}
        <span className={[
          "absolute -bottom-0.5 left-0 h-[1.5px] rounded-full",
          "bg-(--accent-secondary)",
          "transition-all duration-300 ease-out",
          isActive ? "w-full" : "w-0",
        ].join(" ")} aria-hidden="true" />
      </a>
    </li>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────
function MobileMenu({ isOpen, onClose, activeSection }) {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} aria-hidden="true"
        className={[
          "fixed inset-0 z-40",
          "bg-(--bg-primary)/80 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto"
                 : "opacity-0 pointer-events-none",
        ].join(" ")} />

      {/* Panel */}
      <div role="dialog" aria-modal="true" aria-label="Navigation menu"
        className={[
          "fixed top-0 right-0 bottom-0 z-50 w-70",
          "bg-(--bg-secondary)",
          "border-l border-(--border-subtle)",
          "flex flex-col",
          "transition-transform duration-350 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between p-6
          border-b border-(--border-subtle)">
          <span className="font-mono text-xs tracking-widest
            text-(--text-tertiary) uppercase">
            Navigation
          </span>
          <div className="flex items-center gap-3">
            {/* Theme toggle inside mobile menu */}
            <ThemeToggle />
            {/* Close */}
            <button onClick={onClose} aria-label="Close navigation menu"
              className={[
                "w-8 h-8 flex items-center justify-center rounded-lg",
                "text-(--text-secondary)",
                "border border-(--border-subtle)",
                "hover:border-(--accent-secondary)",
                "hover:text-(--accent-secondary)",
                "transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-(--accent-secondary)",
              ].join(" ")}
            >
              <svg viewBox="0 0 16 16" fill="none"
                className="w-4 h-4" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href;
            return (
              <button key={link.href}
                onClick={() => {
                  document.getElementById(link.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                  onClose();
                }}
                className={[
                  "flex items-center gap-4 w-full",
                  "py-3.5 px-4 rounded-lg text-left font-medium",
                  "transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-(--accent-secondary)",
                  isActive
                    ? "text-(--accent-secondary)"
                    : "text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--text-primary)",
                ].join(" ")}
              >
                <span className="font-mono text-xs text-(--text-tertiary) w-5 shrink-0"
                  aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
                {isActive && (
                  <span className="ml-auto text-(--accent-secondary)"
                    aria-hidden="true">→</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-(--border-subtle)">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full text-(--text-secondary)
              animate-pulse-glow shrink-0" />
            <span className="text-xs font-mono text-(--text-secondary) tracking-wide">
              Available for opportunities
            </span>
          </div>
          <Button variant="primary" size="sm"
            href={PERSONAL_INFO.resumeUrl} external showDownload
            className="w-full justify-center">
            Download Resume
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── Hamburger ────────────────────────────────────────────────
function Hamburger({ isOpen, onClick }) {
  return (
    <button onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={[
        "relative flex flex-col items-center justify-center gap-1.25",
        "w-10 h-10 rounded-lg",
        "border border-(--border-subtle)",
        "hover:border-(--accent-secondary)",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-(--accent-secondary)",
        "lg:hidden",
      ].join(" ")}
    >
      {[0, 1, 2].map((i) => (
        <span key={i}
          className="block w-4 h-[1.5px] bg-(--text-primary)
            rounded-full origin-center transition-all duration-300"
          style={{
            transform: isOpen
              ? i === 0 ? "rotate(45deg) translate(3.5px,3.5px)"
              : i === 2 ? "rotate(-45deg) translate(3.5px,-3.5px)"
              : "none"
              : "none",
            opacity: isOpen && i === 1 ? 0 : 1,
          }}
          aria-hidden="true"
        />
      ))}
    </button>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds    = NAV_LINKS.map((l) => l.href);
  const activeSection = useActiveSection(sectionIds);
  const scrollPct     = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ width: `${scrollPct}%` }}
        aria-hidden="true" />

      <header role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          isScrolled
            ? "backdrop-blur-xl border-b py-3"
            : "border-b border-transparent py-5",
        ].join(" ")}
        style={isScrolled ? {
          background:   "var(--nav-bg)",
          borderColor:  "var(--nav-border)",
        } : {}}
      >
        <div className="container-main flex items-center justify-between">

          <Logo onClick={handleLogoClick} />

          {/* Desktop nav */}
          <nav aria-label="Main navigation">
            <ul className="hidden lg:flex items-center gap-8 list-none">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label}
                  isActive={activeSection === link.href} />
              ))}
            </ul>
          </nav>

          {/* Desktop right — toggle + availability + resume */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Availability pulse */}
            {PERSONAL_INFO.availability && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400
                  animate-pulse-glow" aria-hidden="true" />
                <span className="font-mono text-xs text-(--text-secondary)
                  tracking-wider">
                  Available
                </span>
              </div>
            )}

            {/* Theme toggle */}
            <ThemeToggle />

            <Button variant="outline" size="sm"
              href={PERSONAL_INFO.resumeUrl} external showDownload>
              Resume
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Hamburger isOpen={menuOpen}
            onClick={() => setMenuOpen((p) => !p)} />
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}
        activeSection={activeSection} />
    </>
  );
}