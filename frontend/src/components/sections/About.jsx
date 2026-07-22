import { useRef } from "react";
import {
    PERSONAL_INFO, ABOUT_CARDS, STATS,
    EXPERIENCE, EDUCATION
} from "../../constants/data";
import { useStaggerReveal } from "../../hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";
import Badge from "../ui/Badge";

// ─── Capability Card ──────────────────────────────────────────
function CapabilityCard({ icon, title, desc, index }) {
    return (
        <div
            className={[
                "card p-6 rounded-xl",
                "group cursor-default",
                "border-t-2 border-t-transparent",
                "hover:border-t-(--accent-primary)",
            ].join(" ")}
            style={{
                transitionDelay: `${index * 60}ms`,
            }}
        >
            <div
                className={[
                    "w-11 h-11 rounded-lg mb-4",
                    "flex items-center justify-center",
                    "bg-(--bg-hover)",
                    "border border-(--border-subtle)",
                    "text-xl",
                    "group-hover:border-(--accent-primary)/40",
                    "group-hover:bg-(--accent-primary)/5",
                    "transition-all duration-300",
                ].join(" ")}
                aria-hidden="true"
            >
                {icon}
            </div>

            <h3
                className={[
                    "font-display font-bold text-base",
                    "text-(--text-primary)",
                    "mb-2 tracking-tight",
                    "group-hover:text-(--accent-primary)",
                    "transition-colors duration-200",
                ].join(" ")}
            >
                {title}
            </h3>

            <p className="text-sm text-(--text-secondary) leading-relaxed">
                {desc}
            </p>
        </div>
    );
}

// ─── Stats Row ────────────────────────────────────────────────
function StatsRow() {
    return (
        <div
            className={[
                "grid grid-cols-2 sm:grid-cols-4 gap-0",
                "border border-(--border-subtle)",
                "rounded-xl overflow-hidden",
                "mt-10",
            ].join(" ")}
            role="list"
            aria-label="Career statistics"
        >
            {STATS.map((stat, i) => (
                <div
                    key={stat.label}
                    role="listitem"
                    className={[
                        "flex flex-col items-center justify-center",
                        "py-6 px-4 text-center",
                        "bg-(--bg-card)",
                        // Right border on all but last in each row
                        i < STATS.length - 1 ? "border-r border-(--border-subtle)" : "",
                        // Bottom border on first row for 2-col mobile layout
                        i < 2 ? "border-b sm:border-b-0 border-(--border-subtle)" : "",
                        "group hover:bg-(--bg-hover) transition-colors duration-200",
                    ].join(" ")}
                >
                    {/* Stat number */}
                    <span
                        className={[
                            "font-display font-bold",
                            "text-3xl tracking-tight",
                            "text-(--accent-primary)",
                            "group-hover:scale-110",
                            "transition-transform duration-200",
                            "inline-block",
                        ].join(" ")}
                        aria-label={`${stat.value} ${stat.label}`}
                    >
                        {stat.value}
                    </span>

                    {/* Stat label */}
                    <span
                        className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mt-1.5"
                    >
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── Timeline Item ────────────────────────────────────────────
function TimelineItem({ item, isLast = false, type = "experience" }) {
    const isExp = type === "experience";

    return (
        <div className="flex gap-4 group">
            {/* Left — timeline line + dot */}
            <div className="flex flex-col items-center shrink-0">
                {/* Dot */}
                <div
                    className={[
                        "w-3 h-3 rounded-full mt-1 shrink-0",
                        "border-2",
                        "transition-colors duration-200",
                        "group-hover:border-(--accent-primary)",
                        "group-hover:bg-(--accent-primary)",
                        isExp
                            ? "border-(--accent-secondary) bg-(--bg-card)"
                            : "border-(--text-tertiary) bg-(--bg-card)",
                    ].join(" ")}
                    aria-hidden="true"
                />

                {/* Connecting line — hidden on last item */}
                {!isLast && (
                    <div
                        className="w-px flex-1 min-h-8 mt-1 bg-(--border-subtle)"
                        aria-hidden="true"
                    />
                )}
            </div>

            {/* Right — content */}
            <div className="pb-8 flex-1 min-w-0">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                        {/* Role / Degree */}
                        <h4
                            className={[
                                "font-display font-bold text-base",
                                "text-(--text-primary) tracking-tight",
                                "group-hover:text-(--accent-primary)",
                                "transition-colors duration-200",
                            ].join(" ")}
                        >
                            {isExp ? item.role : item.degree}
                        </h4>

                        {/* Company / School */}
                        <p className="font-medium text-sm text-(--text-secondary) mt-0.5">
                            {isExp ? item.company : item.school}
                            {item.location && (
                                <span className="text-(--text-tertiary) font-normal">
                                    {" "}· {item.location}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Period badge */}
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                        {item.period}
                    </Badge>
                </div>

                {/* Grade (education only) */}
                {!isExp && item.grade && (
                    <p className="font-mono text-xs text-(--accent-primary) mb-2">
                        {item.grade}
                    </p>
                )}

                {/* Description */}
                {item.desc && (
                    <p className="text-sm text-(--text-secondary) leading-relaxed mb-3">
                        {item.desc}
                    </p>
                )}

                {/* Tech stack (experience only) */}
                {isExp && item.stack && item.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((tech) => (
                            <Badge key={tech} variant="tech">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Timeline Section ─────────────────────────────────────────
function Timeline() {
    // Don't render if both arrays are empty
    const hasExp = EXPERIENCE && EXPERIENCE.length > 0;
    const hasEdu = EDUCATION && EDUCATION.length > 0;
    if (!hasExp && !hasEdu) return null;

    return (
        <div className="mt-20 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Experience column */}
                {hasExp && (
                    <div>
                        <Badge variant="mono" dash className="mb-8">
                            Experience
                        </Badge>

                        <div role="list" aria-label="Work experience">
                            {EXPERIENCE.map((item, i) => (
                                <div key={i} role="listitem">
                                    <TimelineItem
                                        item={item}
                                        isLast={i === EXPERIENCE.length - 1}
                                        type="experience"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education column */}
                {hasEdu && (
                    <div>
                        <Badge variant="mono" dash className="mb-8">
                            Education
                        </Badge>

                        <div role="list" aria-label="Education history">
                            {EDUCATION.map((item, i) => (
                                <div key={i} role="listitem">
                                    <TimelineItem
                                        item={item}
                                        isLast={i === EDUCATION.length - 1}
                                        type="education"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main About Section ───────────────────────────────────────
export default function About() {
    // Stagger the capability cards on scroll
    const cardsRef = useRef(null);
    useStaggerReveal(cardsRef, { staggerMs: 70, threshold: 0.1 });

    return (
        <section
            id="about"
            className="section-padding bg-(--bg-secondary)"
            aria-labelledby="about-heading"
        >
            <div className="container-main">

                {/* Section header */}
                <SectionHeader
                    label="About Me"
                    number={1}
                    title="Building things that matter."
                    titleAccent="matter"
                    subtitle="Full stack developer focused on MERN stack and AI-powered products."
                    id="about-heading"
                />

                {/* ── Two column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left — Story */}
                    <div>
                        {/* Bio paragraphs */}
                        <div className="space-y-5 mb-10">
                            {PERSONAL_INFO.bio.map((paragraph, i) => (
                                <p
                                    key={i}
                                    className={[
                                        "reveal",
                                        i > 0 ? `reveal-delay-${i}` : "",
                                        "text-(--text-secondary)",
                                        "text-base sm:text-lg",
                                        "leading-relaxed",
                                    ].join(" ")}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Currently section */}
                        <div
                            className={[
                                "reveal reveal-delay-2",
                                "rounded-xl p-5",
                                "border border-(--border-subtle)",
                                "bg-(--bg-card)",
                                "mb-8",
                            ].join(" ")}
                        >
                            {/* Label */}
                            <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-3">
                                Currently
                            </p>

                            {/* Status items */}
                            <ul className="space-y-2.5" aria-label="Current activities">
                                {[
                                    { dot: "var(--accent-primary)", text: "Building full stack web applications with MERN stack" },
                                    { dot: "var(--accent-secondary)", text: "Exploring AI integration with LLMs and OpenAI API" },
                                    { dot: "#FF6B35", text: "Open to internship and full-time opportunities" },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-1.75 w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ background: item.dot }}
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm text-(--text-secondary) leading-relaxed">
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA — view projects */}
                        <div className="reveal reveal-delay-3">
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("projects")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={[
                                    "inline-flex items-center gap-2",
                                    "font-mono text-sm font-medium",
                                    "text-(--accent-primary)",
                                    "hover:gap-3 transition-all duration-200",
                                    "group",
                                ].join(" ")}
                            >
                                See what I've built
                                <span
                                    className="group-hover:translate-x-1 transition-transform duration-200"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Right — Capability cards */}
                    <div>
                        {/* Cards grid — stagger animation via useStaggerReveal */}
                        <div
                            ref={cardsRef}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            role="list"
                            aria-label="Core capabilities"
                        >
                            {ABOUT_CARDS.map((card, i) => (
                                <div key={i} role="listitem">
                                    <CapabilityCard
                                        icon={card.icon}
                                        title={card.title}
                                        desc={card.desc}
                                        index={i}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Stats row */}
                        <div className="reveal reveal-delay-2">
                            <StatsRow />
                        </div>
                    </div>
                </div>

                {/* ── Timeline ── */}
                <Timeline />
            </div>
        </section>
    );
}