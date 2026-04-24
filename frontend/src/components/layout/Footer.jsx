/* ============================================================
   src/components/layout/Footer.jsx
   Portfolio footer with:
   - Brand reinforcement
   - Quick nav links
   - Social links
   - Final CTA
   - "Built with" tech stack credits
   ============================================================ */

import { PERSONAL_INFO, NAV_LINKS, CONTACT_INFO } from "../../constants/data";
import Button from "../ui/Button";

// ─── Social Icons (inline SVG — no icon library needed) ──────
const SOCIAL_ICONS = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.902-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

// ─── Social Link ──────────────────────────────────────────────
function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={[
        "w-9 h-9 rounded-lg",
        "flex items-center justify-center",
        "border border-[var(--border-subtle)]",
        "text-[var(--text-secondary)]",
        "hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
        "hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(232,255,71,0.15)]",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]",
      ].join(" ")}
    >
      {icon}
    </a>
  );
}

// ─── Footer Nav Link ──────────────────────────────────────────
function FooterNavLink({ href, label }) {
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <li>
      <a
        href={`#${href}`}
        onClick={handleClick}
        className={[
          "text-sm text-[var(--text-secondary)]",
          "hover:text-[var(--accent-primary)]",
          "transition-colors duration-150",
          "font-medium",
        ].join(" ")}
      >
        {label}
      </a>
    </li>
  );
}

// ─── Built With Stack ─────────────────────────────────────────
// Small tasteful credit line showing your tech choices
function BuiltWith() {
  const stack = ["React", "Tailwind CSS", "Vite"];

  return (
    <p className="font-mono text-xs text-[var(--text-tertiary)] tracking-wide">
      Built with{" "}
      {stack.map((tech, i) => (
        <span key={tech}>
          <span className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-150 cursor-default">
            {tech}
          </span>
          {i < stack.length - 1 && (
            <span className="mx-1 text-[var(--text-tertiary)]">·</span>
          )}
        </span>
      ))}
    </p>
  );
}

// ─── Main Footer ──────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Social links assembled from PERSONAL_INFO
  const socialLinks = [
    {
      key:   "github",
      href:  PERSONAL_INFO.socials.github,
      icon:  SOCIAL_ICONS.github,
      label: "GitHub profile",
    },
    {
      key:   "linkedin",
      href:  PERSONAL_INFO.socials.linkedin,
      icon:  SOCIAL_ICONS.linkedin,
      label: "LinkedIn profile",
    },
    {
      key:   "twitter",
      href:  PERSONAL_INFO.socials.twitter,
      icon:  SOCIAL_ICONS.twitter,
      label: "Twitter / X profile",
    },
    {
      key:   "email",
      href:  `mailto:${PERSONAL_INFO.email}`,
      icon:  SOCIAL_ICONS.email,
      label: "Send email",
    },
  ].filter((s) => s.href); // hide links with no URL set

  return (
    <footer
      className={[
        "relative",
        "bg-[var(--bg-secondary)]",
        "border-t border-[var(--border-subtle)]",
        "overflow-hidden",
      ].join(" ")}
      role="contentinfo"
    >

      {/* ── Decorative background glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(232,255,71,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Top CTA band ── */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="container-main py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            {/* Left — final CTA copy */}
            <div className="max-w-md">
              <p className="font-mono text-xs tracking-widest text-[var(--accent-primary)] uppercase mb-3">
                Open to opportunities
              </p>
              <h2 className={[
                "font-display font-bold",
                "text-3xl sm:text-4xl tracking-tight leading-tight",
                "text-[var(--text-primary)]",
                "mb-2",
              ].join(" ")}>
                Let's build something
                <span className="text-[var(--accent-primary)] italic"> great.</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Available for full-time roles, freelance projects, and interesting collaborations.
              </p>
            </div>

            {/* Right — action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button
                variant="primary"
                size="md"
                href={`mailto:${PERSONAL_INFO.email}`}
                showArrow
              >
                Send a Message
              </Button>
              <Button
                variant="outline"
                size="md"
                href={PERSONAL_INFO.resumeUrl}
                external
                showDownload
              >
                Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <span className="font-mono text-[var(--accent-primary)] text-xl">&lt;</span>
              <span className="font-display font-bold text-lg text-[var(--text-primary)] tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[var(--accent-primary)] text-xl">/&gt;</span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[220px]">
              {PERSONAL_INFO.tagline}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s) => (
                <SocialLink key={s.key} href={s.href} icon={s.icon} label={s.label} />
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Nav */}
          <div>
            <p className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <FooterNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact details */}
          <div>
            <p className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              {CONTACT_INFO.map((item) => (
                <li key={item.label}>
  <a
    href={item.href}
    target={item.href.startsWith("http") ? "_blank" : undefined}
    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
    className={[
      "flex items-center gap-2.5 group",
      "text-sm text-[var(--text-secondary)]",
      "hover:text-[var(--accent-primary)]",
      "transition-colors duration-150",
    ].join(" ")}
  >
    <span className="text-base flex-shrink-0" aria-hidden="true">
      {item.icon}
    </span>
    <span className="truncate">{item.value}</span>

    <span
      className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 text-xs"
      aria-hidden="true"
    >
      →
    </span>
  </a>
</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className={[
          "container-main py-5",
          "flex flex-col sm:flex-row items-center justify-between gap-3",
        ].join(" ")}>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-tertiary)] font-mono tracking-wide order-2 sm:order-1">
            © {currentYear}{" "}
            <span className="text-[var(--text-secondary)]">
              {PERSONAL_INFO.name} {PERSONAL_INFO.lastName}
            </span>
            . All rights reserved.
          </p>

          {/* Built with */}
          <div className="order-1 sm:order-2">
            <BuiltWith />
          </div>

          {/* Back to top */}
          <button
            onClick={() =>
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
            }
            className={[
              "order-3",
              "flex items-center gap-2",
              "font-mono text-xs tracking-wide",
              "text-[var(--text-tertiary)]",
              "hover:text-[var(--accent-primary)]",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded",
              "group",
            ].join(" ")}
            aria-label="Back to top"
          >
            Back to top
            <span
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}