import { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO, TYPEWRITER_ROLES } from "../../constants/data";
import { useTypewriter } from "../../hooks/useTypewriter";
import Button, { DownloadIcon } from "../ui/Button";
import Badge from "../ui/Badge";

// ─── Ambient Background ──────────────────────────────────────
function AmbientBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="var(--text-tertiary)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" />
            </svg>

            <div
                className="absolute -top-40 -left-40 w-150 h-150 rounded-full hero-blob-a"
                style={{ background: "radial-gradient(circle, rgba(232,255,71,0.09) 0%, transparent 65%)" }}
            />
            <div
                className="absolute -bottom-60 -right-40 w-175 h-175 rounded-full hero-blob-b"
                style={{ background: "radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 65%)" }}
            />
            <div
                className="absolute top-1/4 right-[15%] w-80 h-80 rounded-full hero-blob-c"
                style={{ background: "radial-gradient(circle, rgba(232,255,71,0.05) 0%, transparent 70%)" }}
            />

            <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
                <filter id="hero-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#hero-grain)" />
            </svg>
            
        </div>
    );
}

function NetworkGraphic({ parallax }) {
    const nodes = [
        { id: "a", x: 80, y: 120, r: 5, color: "var(--accent-primary)" },
        { id: "b", x: 322, y: 86, r: 6, color: "#7B61FF" },
        { id: "c", x: 344, y: 262, r: 5, color: "var(--accent-primary)" },
        { id: "d", x: 142, y: 332, r: 4, color: "#7B61FF" },
        { id: "e", x: 262, y: 330, r: 5, color: "var(--accent-primary)" },
    ];
    const hub = { x: 210, y: 208, r: 9 };

    return (
        <div
            className="hidden xl:flex items-center justify-center w-105 h-105 select-none pointer-events-none"
            style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
            aria-hidden="true"
        >
            <svg viewBox="0 0 420 420" className="w-full h-full overflow-visible">
                <defs>
                    <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Slow-rotating outer ring — 60s, ambient, non-distracting */}
                <g className="hero-orbit-ring" style={{ transformOrigin: "210px 208px" }}>
                    <circle
                        cx="210" cy="208" r="175"
                        fill="none"
                        stroke="var(--border-medium)"
                        strokeWidth="1"
                        strokeDasharray="2 8"
                        opacity="0.35"
                    />
                    <circle cx="210" cy="33" r="3" fill="var(--accent-primary)" opacity="0.7" filter="url(#node-glow)" />
                </g>

                {/* Connections: hub to each satellite, with traveling pulse */}
                {nodes.map((n, i) => (
                    <g key={`line-${n.id}`}>
                        <line
                            x1={hub.x} y1={hub.y} x2={n.x} y2={n.y}
                            stroke="var(--border-medium)"
                            strokeWidth="1"
                            opacity="0.4"
                        />
                        <circle r="2.5" fill={n.color} opacity="0.9" filter="url(#node-glow)">
                            <animateMotion
                                dur={`${3.5 + i * 0.6}s`}
                                repeatCount="indefinite"
                                path={`M${hub.x},${hub.y} L${n.x},${n.y}`}
                                keyPoints="0;1"
                                keyTimes="0;1"
                                calcMode="linear"
                                begin={`${i * 0.4}s`}
                            />
                        </circle>
                    </g>
                ))}

                {/* Satellite nodes */}
                {nodes.map((n) => (
                    <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.85" filter="url(#node-glow)" />
                ))}

                {/* Hub node */}
                <circle cx={hub.x} cy={hub.y} r={hub.r} fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="2" />
                <circle cx={hub.x} cy={hub.y} r="3.5" fill="var(--accent-primary)" filter="url(#node-glow)" />
            </svg>
        </div>
    );
}

function useLocalClock(timeZone) {
    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString("en-US", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })
    );

    useEffect(() => {
        const id = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    timeZone,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })
            );
        }, 1000);
        return () => clearInterval(id);
    }, [timeZone]);

    return time;
}

function StatusRail() {
    const time = useLocalClock("Asia/Kolkata");

    return (
        <div
            className={[
                "hidden xl:flex flex-col items-center justify-between",
                "absolute right-[6%] top-[16%] bottom-[16%]",
                "animate-fade-in delay-500 opacity-0",
                "select-none pointer-events-none",
                "z-10",
            ].join(" ")}
            aria-hidden="true"
        >
            <div className="flex flex-col items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-(--accent-primary) animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.15em] text-(--text-secondary) tabular-nums">
                    {time}
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-(--text-tertiary) uppercase">
                    Local · India
                </span>
            </div>

        </div>
    );
}

// ─── Stats Strip ──────────────────────────────────────────────
function StatsStrip() {
    const stats = [
        { value: "3+", label: "Years" },
        { value: "5+", label: "Projects" },
        { value: "8+", label: "Tech Stack" },
    ];

    return (
        <div
            className="inline-flex items-center gap-6 rounded-2xl border border-(--border-subtle) bg-(--bg-card)/50 backdrop-blur-sm px-6 py-4"
            role="list"
            aria-label="Quick statistics"
        >
            {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6" role="listitem">
                    {i > 0 && <div className="w-px h-7 bg-(--border-subtle)" aria-hidden="true" />}
                    <div>
                        <span className="block font-display font-bold text-xl tracking-tight text-(--accent-primary)">
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
        { label: "GitHub", short: "GH", href: PERSONAL_INFO.socials.github },
        { label: "LinkedIn", short: "LI", href: PERSONAL_INFO.socials.linkedin },
        { label: "Instagram", short: "IG", href: PERSONAL_INFO.socials.instagram },
        { label: "Email", short: "@", href: `mailto:${PERSONAL_INFO.email}` },
    ].filter((l) => l.href);

    return (
        <div className="flex items-center gap-3" role="list" aria-label="Social links">
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
            <div className="w-10 h-px bg-(--border-medium)" aria-hidden="true" />
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700 opacity-0"
            aria-hidden="true"
        >
            <div className="w-6 h-9 rounded-full border-2 border-(--border-medium) flex items-start justify-center pt-1.5">
                <div className="w-1 h-2 rounded-full bg-(--accent-primary) animate-bounce" />
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

    const sectionRef = useRef(null);
    const rafRef = useRef(null);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const handleMouseMove = (e) => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const el = sectionRef.current;
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const relX = (e.clientX - rect.left) / rect.width - 0.5;
                    const relY = (e.clientY - rect.top) / rect.height - 0.5;
                    setParallax({ x: relX * 16, y: relY * 16 });
                }
                rafRef.current = null;
            });
        };

        const el = sectionRef.current;
        el?.addEventListener("mousemove", handleMouseMove);
        return () => {
            el?.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen flex items-center bg-(--bg-primary) overflow-hidden"
            aria-label="Introduction"
        >
            <AmbientBackground />

            <StatusRail />

            <div className="container-main relative z-10 pt-28 pb-24">
                <div className="grid xl:grid-cols-[1fr_420px] xl:gap-16 items-center">
                    <div className="max-w-3xl relative">

                        <span
                            className="hidden lg:block absolute -top-16 -left-4 font-display font-bold text-[13rem] leading-none pointer-events-none select-none"
                            style={{ color: "transparent", WebkitTextStroke: "1px var(--border-subtle)", opacity: 0.4 }}
                            aria-hidden="true"
                        >
                            {PERSONAL_INFO.name?.[0]}
                        </span>

                        {PERSONAL_INFO.availability && (
                            <div className="animate-fade-up opacity-0 mb-8 relative">
                                <Badge variant="available">Available for Work</Badge>
                            </div>
                        )}

                        <p
                            className={[
                                "animate-fade-up delay-100 opacity-0 relative",
                                "font-mono text-xs tracking-[0.2em]",
                                "text-(--text-tertiary) uppercase",
                                "mb-6",
                            ].join(" ")}
                        >
                            {PERSONAL_INFO.location}
                            <span className="mx-2 text-(--border-medium)">·</span>
                            {PERSONAL_INFO.locationDetail}
                        </p>

                        <h1
                            className={[
                                "animate-fade-up delay-200 opacity-0 relative",
                                "font-display font-bold",
                                "text-[clamp(3.2rem,8vw,6.5rem)]",
                                "leading-[0.95] tracking-tight",
                                "text-(--text-primary)",
                                "mb-6",
                            ].join(" ")}
                        >
                            <span className="block text-(--text-secondary) text-[0.45em] font-mono font-normal tracking-[0.15em] uppercase mb-3">
                                Hello, I'm
                            </span>
                            <span className="block font-['Space_Grotesk'] font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--text-primary)_55%,var(--accent-primary)_100%)]">
                                {PERSONAL_INFO.name}
                            </span>
                        </h1>

                        <div
                            className="animate-fade-up delay-300 opacity-0 flex items-center gap-3 mb-6 relative"
                            aria-live="polite"
                            aria-label={`Current role: ${displayText}`}
                        >
                            <span className="font-display font-semibold italic text-xl sm:text-2xl text-(--text-primary) min-h-[1.4em]">
                                {displayText}
                                <span
                                    className={[
                                        "cursor-blink ml-0.5 inline-block w-0.5 h-[1.1em]",
                                        "bg-(--accent-primary) align-text-bottom",
                                        isTyping ? "opacity-100" : "",
                                    ].join(" ")}
                                    aria-hidden="true"
                                />
                            </span>
                        </div>

                        <p
                            className={[
                                "animate-fade-up delay-400 opacity-0 relative",
                                "text-(--text-secondary) text-lg sm:text-xl leading-relaxed",
                                "max-w-xl mb-10",
                            ].join(" ")}
                        >
                            {PERSONAL_INFO.tagline}{" "}
                            <span className="text-(--text-primary) font-medium">
                                Based in India, open to remote.
                            </span>
                        </p>

                        <div className="animate-fade-up delay-500 opacity-0 flex flex-wrap items-center gap-4 mb-12 relative">
                            <Button
                                variant="primary"
                                size="lg"
                                href="#projects"
                                showArrow
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                View My Work
                            </Button>
                            <Button variant="outline" size="lg" href={PERSONAL_INFO.resumeUrl} external showDownload>
                                Download Resume
                            </Button>
                        </div>

                        <div className="animate-fade-up delay-600 opacity-0 mb-10 relative">
                            <StatsStrip />
                        </div>

                        <div className="animate-fade-up delay-700 opacity-0 relative">
                            <SocialLinks />
                        </div>
                    </div>

                    <NetworkGraphic parallax={parallax} />
                </div>
            </div>

            <ScrollIndicator />

            <style>{`
                @keyframes hero-blob-drift-a {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, 40px) scale(1.08); }
                }
                @keyframes hero-blob-drift-b {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-40px, -25px) scale(1.05); }
                }
                @keyframes hero-blob-drift-c {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
                    50% { transform: translate(-20px, 30px) scale(1.15); opacity: 0.6; }
                }
                @keyframes hero-orbit-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .hero-blob-a { animation: hero-blob-drift-a 18s ease-in-out infinite; }
                .hero-blob-b { animation: hero-blob-drift-b 22s ease-in-out infinite; }
                .hero-blob-c { animation: hero-blob-drift-c 14s ease-in-out infinite; }
                .hero-orbit-ring { animation: hero-orbit-spin 60s linear infinite; }

                @media (prefers-reduced-motion: reduce) {
                    .hero-blob-a, .hero-blob-b, .hero-blob-c, .hero-orbit-ring {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    );
}