/* ============================================================
   src/components/layout/Navbar.jsx
   Fixed navigation bar with:
   - Scroll-aware background + border
   - Active section highlighting (synced to scroll position)
   - Animated mobile menu
   - Keyboard accessible
   - Resume download CTA
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, PERSONAL_INFO }    from "../../constants/data";
import { useActiveSection }            from "../../hooks/useScrollReveal";
import { useScrollProgress }           from "../../hooks/useScrollReveal";
import Button                          from "../ui/Button";

// ─── Logo ────────────────────────────────────────────────────
function Logo({ onClick }) {
  return (
    <a
      href="#hero"
      onClick={onClick}
      className="flex items-center gap-1 group"
      aria-label="Go to top"
    >
      <span
        className={[
          "font-mono text-[var(--accent-primary)] text-xl",
          "transition-transform duration-300",
          "group-hover:-translate-x-0.5",
        ].join(" ")}
      >
        &lt;
      </span>

      <span
        className={[
          "font-display font-bold text-lg tracking-tight",
          "text-[var(--text-primary)]",
          "group-hover:text-[var(--accent-primary)]",
        ].join(" ")}
      >
        {PERSONAL_INFO.name}
      </span>

      <span
        className={[
          "font-mono text-[var(--accent-primary)] text-xl",
          "transition-transform duration-300",
          "group-hover:translate-x-0.5",
        ].join(" ")}
      >
        /&gt;
      </span>
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
      <a
        href={`#${href}`}
        onClick={handleClick}
        className={[
          "relative py-1 text-sm font-medium tracking-wide",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[var(--accent-primary)] rounded-sm",
          isActive
            ? "text-[var(--accent-primary)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        ].join(" ")}
        aria-current={isActive ? "page" : undefined}
      >
        {label}

        <span
          className={[
            "absolute -bottom-0.5 left-0 h-[1.5px]",
            "bg-[var(--accent-primary)]",
            "transition-all duration-300",
            isActive ? "w-full" : "w-0",
          ].join(" ")}
        />
      </a>
    </li>
  );
}

// ─── Mobile Menu ─────────────────────────────────────────────
function MobileMenu({ isOpen, onClose, activeSection }) {
  // Trap focus inside menu when open
  const menuRef = useRef(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleNavClick = (href) => {
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-40",
          "bg-[var(--bg-primary)]/80 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed top-0 right-0 bottom-0 z-50",
          "w-[280px]",
          "bg-[var(--bg-secondary)]",
          "border-l border-[var(--border-subtle)]",
          "flex flex-col",
          "transition-transform duration-350 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
          <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
            Navigation
          </span>

          {/* Close button */}
          <button
            onClick={onClose}
            className={[
              "w-8 h-8 flex items-center justify-center rounded-lg",
              "text-[var(--text-secondary)]",
              "border border-[var(--border-subtle)]",
              "hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]",
            ].join(" ")}
            aria-label="Close navigation menu"
          >
            {/* X icon */}
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Menu links */}
        <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={[
                  "flex items-center gap-4 w-full",
                  "py-3.5 px-4 rounded-lg",
                  "text-left font-medium",
                  "transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]",
                  isActive
                    ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
                ].join(" ")}
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {/* Index number */}
                <span
                  className="font-mono text-xs text-[var(--text-tertiary)] w-5 flex-shrink-0"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}

                {/* Active arrow */}
                {isActive && (
                  <span className="ml-auto text-[var(--accent-primary)]" aria-hidden="true">
                    →
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Menu footer — availability status */}
        <div className="p-6 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse-glow flex-shrink-0" />
            <span className="text-xs font-mono text-[var(--text-secondary)] tracking-wide">
              Available for opportunities
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            href={PERSONAL_INFO.resumeUrl}
            external
            showDownload
            className="w-full justify-center"
          >
            Download Resume
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── Hamburger Button ─────────────────────────────────────────
function Hamburger({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative flex flex-col items-center justify-center",
        "w-10 h-10 rounded-lg",
        "border border-[var(--border-subtle)]",
        "hover:border-[var(--accent-primary)]",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]",
        "lg:hidden",
        "gap-[5px]",
      ].join(" ")}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {/* Three lines that morph into X */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-4 h-[1.5px] bg-[var(--text-primary)] rounded-full origin-center transition-all duration-300"
          style={{
            transform: isOpen
              ? i === 0 ? "rotate(45deg) translate(3.5px, 3.5px)"
              : i === 1 ? "scaleX(0) opacity(0)"
              : "rotate(-45deg) translate(3.5px, -3.5px)"
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
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [isScrolled,  setIsScrolled]  = useState(false);

  // Track which section is in view — from our custom hook
  const sectionIds    = NAV_LINKS.map((l) => l.href);
  const activeSection = useActiveSection(sectionIds);
  const scrollPct     = useScrollProgress();

  // ── Detect scroll for nav background change ────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
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
      {/* ── Scroll Progress Bar ── */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      {/* ── Main Nav ── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-30",
          "transition-all duration-300",
          // Scroll-aware background
          isScrolled
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] py-3"
            : "bg-transparent border-b border-transparent py-5",
        ].join(" ")}
        role="banner"
      >
        <div className="container-main flex items-center justify-between">

          {/* Logo */}
          <Logo onClick={handleLogoClick} />

          {/* Desktop nav links */}
          <nav aria-label="Main navigation">
            <ul className="hidden lg:flex items-center gap-8 list-none">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeSection === link.href}
                />
              ))}
            </ul>
          </nav>

          {/* Desktop right side — resume CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Availability pulse */}
            {PERSONAL_INFO.availability && (
              <div className="flex items-center gap-2 mr-2">
                <span
                  className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse-glow"
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-[var(--text-secondary)] tracking-wider">
                  Available
                </span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              href={PERSONAL_INFO.resumeUrl}
              external
              showDownload
            >
              Resume
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Hamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}