/* ============================================================
   src/components/sections/Hero.jsx
   Full-viewport hero section with:
   - Animated headline entrance
   - Typewriter role cycling
   - Availability badge
   - Dual CTA buttons
   - Social links
   - Decorative grid + glow background
   - Scroll indicator
   ============================================================ */

import { useRef } from "react";
import { PERSONAL_INFO, TYPEWRITER_ROLES } from "../../constants/data";
import { useTypewriter } from "../../hooks/useTypewriter";
import Button, { DownloadIcon } from "../ui/Button";
import Badge from "../ui/Badge";

// ─── Background Grid ─────────────────────────────────────────
// Subtle dot-grid pattern — engineering / technical aesthetic
function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

            {/* Dot grid via SVG pattern */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.15]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="dot-grid"
                        x="0" y="0"
                        width="32" height="32"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="1" cy="1" r="1" fill="var(--text-tertiary)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" />
            </svg>

            {/* Lime glow — top left */}
            <div
                className="absolute -top-40 -left-40 w-150 h-150 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(232,255,71,0.07) 0%, transparent 65%)",
                }}
            />

            {/* Violet glow — bottom right */}
            <div
                className="absolute -bottom-60 -right-40 w-175 h-175 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 65%)",
                }}
            />

            {/* Horizontal scan line — subtle editorial detail */}
            <div
                className="absolute top-1/3 left-0 right-0 h-px opacity-10"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
                }}
            />
        </div>
    );
}

// ─── Floating Code Snippet ────────────────────────────────────
// Decorative terminal snippet — reinforces "developer" identity
function FloatingCodeCard() {
    return (
        <div
            className={[
                "hidden xl:block",
                "absolute right-[6%] top-[22%]",
                "animate-float",
                "select-none pointer-events-none",
            ].join(" ")}
            aria-hidden="true"
        >
            <div
                className={[
                    "rounded-xl overflow-hidden",
                    "border border-(--border-subtle)",
                    "bg-(--bg-card)/90 backdrop-blur-sm",
                    "shadow-[0_24px_64px_rgba(0,0,0,0.5)]",
                    "w-70",
                ].join(" ")}
            >
                {/* Terminal title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border-subtle) bg-(--bg-secondary)">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 font-mono text-[10px] text-(--text-tertiary) tracking-wide">
                        portfolio.js
                    </span>
                </div>

                {/* Code content */}
                <div className="px-4 py-4 font-mono text-[11px] leading-6 space-y-0.5">
                    <p>
                        <span className="text-[#7B61FF]">const </span>
                        <span className="text-(--accent-primary)">dev</span>
                        <span className="text-(--text-secondary)"> = {"{"}</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-(--text-secondary)">name: </span>
                        <span className="text-emerald-400">"{PERSONAL_INFO.name}"</span>
                        <span className="text-(--text-secondary)">,</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-(--text-secondary)">role: </span>
                        <span className="text-emerald-400">"Full Stack"</span>
                        <span className="text-(--text-secondary)">,</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-(--text-secondary)">open: </span>
                        <span className="text-[#FF6B35]">true</span>
                        <span className="text-(--text-secondary)">,</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-(--text-secondary)">coffee: </span>
                        <span className="text-[#FF6B35]">Infinity</span>
                    </p>
                    <p>
                        <span className="text-(--text-secondary)">{"}"}</span>
                    </p>
                    <p className="pt-1">
                        <span className="text-[#7B61FF]">export default </span>
                        <span className="text-(--accent-primary)">dev</span>
                        <span className="text-(--text-secondary)">;</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

// ─── Stats Strip ──────────────────────────────────────────────
// Quick numbers that establish credibility at a glance
function StatsStrip() {
    const stats = [
        { value: "3+", label: "Years" },
        { value: "5+", label: "Projects" },
        { value: "8+", label: "Tech Stack" },
    ];

    return (
        <div
            className="flex items-center gap-6 pt-2"
            role="list"
            aria-label="Quick statistics"
        >
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className="flex items-center gap-3"
                    role="listitem"
                >
                    {/* Divider — skip on first item */}
                    {i > 0 && (
                        <div
                            className="w-px h-7 bg-(--border-subtle)"
                            aria-hidden="true"
                        />
                    )}
                    <div>
                        <span
                            className={[
                                "block font-display font-bold",
                                "text-xl tracking-tight",
                                "text-(--accent-primary)",
                            ].join(" ")}
                        >
                            {stat.value}
                        </span>
                        <span className="block font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase">
                            {stat.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Social Links ─────────────────────────────────────────────
function SocialLinks() {
    const links = [
        {
            label: "GitHub",
            short: "GH",
            href: PERSONAL_INFO.socials.github,
        },
        {
            label: "LinkedIn",
            short: "LI",
            href: PERSONAL_INFO.socials.linkedin,
        },
        {
            label: "Email",
            short: "@",
            href: `mailto:${PERSONAL_INFO.email}`,
        },
    ].filter((l) => l.href);

    return (
        <div
            className="flex items-center gap-3"
            role="list"
            aria-label="Social links"
        >
            {links.map((link) => {
                const isExternal = /^https?:\/\//.test(link.href);

                return (
                    <a
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={link.label}
                        role="listitem"
                        className={[
                            "w-10 h-10 rounded-lg",
                            "flex items-center justify-center",
                            "border border-(--border-subtle)",
                            "font-mono text-xs font-bold",
                            "text-(--text-secondary)",
                            "hover:border-(--accent-primary)",
                            "hover:text-(--accent-primary)",
                            "hover:-translate-y-1",
                            "hover:shadow-[0_6px_20px_rgba(232,255,71,0.15)]",
                            "transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-primary)",
                        ].join(" ")}
                    >
                        {link.short}
                    </a>
                );
            })}

            {/* Separator line */}
            <div
                className="w-10 h-px bg-(--border-medium)"
                aria-hidden="true"
            />

            <span className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase">
                Connect
            </span>
        </div>
    );
}

// ─── Scroll Indicator ─────────────────────────────────────────
function ScrollIndicator() {
    return (
        <div
            className={[
                "absolute bottom-8 left-1/2 -translate-x-1/2",
                "flex flex-col items-center gap-2",
                "animate-fade-in delay-700",
                "opacity-0",               // starts hidden, animation fills it in
            ].join(" ")}
            aria-hidden="true"
        >
            {/* Mouse outline */}
            <div
                className={[
                    "w-6 h-9 rounded-full",
                    "border-2 border-(--border-medium)",
                    "flex items-start justify-center pt-1.5",
                ].join(" ")}
            >
                {/* Scroll wheel dot */}
                <div
                    className={[
                        "w-1 h-2 rounded-full",
                        "bg-(--accent-primary)",
                        "animate-bounce",
                    ].join(" ")}
                />
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-(--text-tertiary) uppercase">
                Scroll
            </span>
        </div>
    );
}

// ─── Main Hero Section ────────────────────────────────────────
export default function Hero() {
    const { displayText, isTyping } = useTypewriter(TYPEWRITER_ROLES, {
        typeSpeed: 75,
        deleteSpeed: 35,
        pauseDuration: 2000,
        startDelay: 800,
    });

    return (
        <section
            id="hero"
            className={[
                "relative min-h-screen",
                "flex items-center",
                "bg-(--bg-primary)",
                "overflow-hidden",
            ].join(" ")}
            aria-label="Introduction"
        >
            {/* ── Background decorations ── */}
            <GridBackground />

            {/* ── Floating code card (desktop only) ── */}
            <FloatingCodeCard />

            {/* ── Main content ── */}
            <div className="container-main relative z-10 pt-28 pb-24">
                <div className="max-w-3xl">

                    {/* Availability badge */}
                    {PERSONAL_INFO.availability && (
                        <div className="animate-fade-up opacity-0 mb-8">
                            <Badge variant="available">
                                Available for Work
                            </Badge>
                        </div>
                    )}

                    {/* Location line */}
                    <p
                        className={[
                            "animate-fade-up delay-100 opacity-0",
                            "font-mono text-xs tracking-[0.2em]",
                            "text-(--text-tertiary) uppercase",
                            "mb-6",
                        ].join(" ")}
                    >
                        {PERSONAL_INFO.location}
                        <span className="mx-2 text-(--border-medium)">·</span>
                        {PERSONAL_INFO.locationDetail}
                    </p>

                    {/* Main headline */}
                    <h1
                        className={[
                            "animate-fade-up delay-200 opacity-0",
                            "font-display font-bold",
                            "text-[clamp(3.2rem,8vw,6.5rem)]",
                            "leading-[0.95] tracking-tight",
                            "text-(--text-primary)",
                            "mb-6",
                        ].join(" ")}
                    >
                        {/* Greeting line */}
                        <span className="block text-(--text-secondary) text-[0.45em] font-mono font-normal tracking-[0.15em] uppercase mb-3">
                            Hello, I'm
                        </span>

                        {/* Name — main focal point */}
                        <span className="block">
                            {PERSONAL_INFO.name}
                        </span>

                        {/* Last name with accent underline */}
                        <span className="block relative w-fit">
                            {PERSONAL_INFO.lastName}
                            {/* Lime underline accent */}
                            <span
                                className={[
                                    "absolute -bottom-2 left-0",
                                    "h-1 rounded-full",
                                    "bg-(--accent-primary)",
                                    "animate-fade-up delay-500 opacity-0",
                                ].join(" ")}
                                style={{ width: "60%" }}
                                aria-hidden="true"
                            />
                        </span>
                    </h1>

                    {/* Typewriter role */}
                    <div
                        className={[
                            "animate-fade-up delay-300 opacity-0",
                            "flex items-center gap-3 mb-6",
                        ].join(" ")}
                        aria-live="polite"
                        aria-label={`Current role: ${displayText}`}
                    >
                        {/* Bracket prefix — terminal aesthetic */}
                        <span
                            className="font-mono text-(--accent-primary) text-xl leading-none"
                            aria-hidden="true"
                        >
                            &gt;_
                        </span>

                        <span
                            className={[
                                "font-display font-semibold italic",
                                "text-xl sm:text-2xl",
                                "text-(--text-primary)",
                                "min-h-[1.4em]",           // prevents layout shift
                            ].join(" ")}
                        >
                            {displayText}
                            {/* Blinking cursor */}
                            <span
                                className={[
                                    "cursor-blink ml-0.5",
                                    "inline-block w-0.5 h-[1.1em]",
                                    "bg-(--accent-primary)",
                                    "align-text-bottom",
                                    // Cursor solid while typing, blink while pausing
                                    isTyping ? "opacity-100" : "",
                                ].join(" ")}
                                aria-hidden="true"
                            />
                        </span>
                    </div>

                    {/* Tagline */}
                    <p
                        className={[
                            "animate-fade-up delay-400 opacity-0",
                            "text-(--text-secondary)",
                            "text-lg sm:text-xl",
                            "leading-relaxed",
                            "max-w-xl",
                            "mb-10",
                        ].join(" ")}
                    >
                        {PERSONAL_INFO.tagline}{" "}
                        <span className="text-(--text-primary) font-medium">
                            Based in India, open to remote.
                        </span>
                    </p>

                    {/* CTA row */}
                    <div
                        className={[
                            "animate-fade-up delay-500 opacity-0",
                            "flex flex-wrap items-center gap-4",
                            "mb-12",
                        ].join(" ")}
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            href="#projects"
                            showArrow
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("projects")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            View My Work
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            href={PERSONAL_INFO.resumeUrl}
                            external
                            showDownload
                        >
                            Download Resume
                        </Button>
                    </div>

                    {/* Stats strip */}
                    <div className="animate-fade-up delay-600 opacity-0 mb-10">
                        <StatsStrip />
                    </div>

                    {/* Social links */}
                    <div className="animate-fade-up delay-700 opacity-0">
                        <SocialLinks />
                    </div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <ScrollIndicator />
        </section>
    );
}