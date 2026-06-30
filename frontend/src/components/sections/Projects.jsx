import { useRef, useState } from "react";
import { PROJECTS } from "../../constants/data";
import { useStaggerReveal } from "../../hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";
import Badge, { BadgeGroup } from "../ui/Badge";
import Button from "../ui/Button";

// ─── Icons ───────────────────────────────────────────────────
function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true">
            <path
                d="M3 8l3.5 3.5L13 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── Project Number ───────────────────────────────────────────
function ProjectNumber({ index }) {
    return (
        <span
            className={[
                "font-mono text-[10px] tracking-widest",
                "text-(--text-tertiary)",
                "select-none",
            ].join(" ")}
            aria-hidden="true"
        >
            {String(index + 1).padStart(2, "0")}
        </span>
    );
}

// ─── Featured Project Card ────────────────────────────────────
// Large card — takes full width, shows all details
function FeaturedCard({ project, index }) {
    const [hovered, setHovered] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <article
            className={[
                "relative rounded-2xl overflow-hidden",
                "border border-(--border-subtle)",
                "bg-(--bg-card)",
                "transition-all duration-350",
                "hover:border-(--border-medium)",
                "hover:shadow-[0_32px_80px_rgba(0,0,0,0.4)]",
                "group",
            ].join(" ")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={`Featured project: ${project.title}`}
        >
            {/* Accent glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                    boxShadow: `inset 0 0 60px ${project.accentColor}08`,
                }}
                aria-hidden="true"
            />

            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-300"
                style={{
                    background: hovered
                        ? `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`
                        : "transparent",
                }}
                aria-hidden="true"
            />

            <div
                className={[
                    "grid grid-cols-1 lg:grid-cols-2",
                    "gap-0",
                    // Alternate layout direction for visual rhythm
                    isEven ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
                ].join(" ")}
            >
                {/* Left — Visual panel */}
                <div
                    className={[
                        "relative flex items-center justify-center",
                        "min-h-55 lg:min-h-80",
                        "overflow-hidden",
                        "border-b lg:border-b-0",
                        isEven ? "lg:border-r" : "lg:border-l",
                        "border-(--border-subtle)",
                    ].join(" ")}
                    style={{
                        background: `radial-gradient(ellipse at center, ${project.accentColor}12 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                >
                    {/* Large emoji */}
                    <span
                        className={[
                            "text-[6rem] select-none",
                            "transition-transform duration-500",
                            hovered ? "scale-110" : "scale-100",
                        ].join(" ")}
                    >
                        {project.emoji}
                    </span>

                    {/* Decorative corner grid */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full">
                            <defs>
                                <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
                        </svg>
                    </div>

                    {/* Status badge — top right of visual panel */}
                    <div className="absolute top-4 right-4">
                        <Badge variant="status" status={project.status} />
                    </div>

                    {/* Project number — bottom left */}
                    <div className="absolute bottom-4 left-4">
                        <ProjectNumber index={index} />
                    </div>
                </div>

                {/* Right — Content panel */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                    <div>
                        {/* Header */}
                        <div className="mb-5">
                            <h3
                                className={[
                                    "font-display font-bold",
                                    "text-xl sm:text-2xl tracking-tight",
                                    "text-(--text-primary)",
                                    "mb-2",
                                    "group-hover:text-(--accent-primary)",
                                    "transition-colors duration-200",
                                ].join(" ")}
                            >
                                {project.title}
                            </h3>

                            <p className="text-(--text-secondary) text-sm leading-relaxed">
                                {project.longDesc}
                            </p>
                        </div>

                        {/* Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                            <ul
                                className="space-y-2 mb-6"
                                aria-label="Project highlights"
                            >
                                {project.highlights.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="flex items-start gap-2 text-sm text-(--text-secondary)"
                                    >
                                        <span style={{ color: project.accentColor }}>
                                            <CheckIcon />
                                        </span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Tech stack */}
                        <BadgeGroup className="mb-8">
                            {project.stack.map((tech) => (
                                <Badge key={tech} variant="tech">
                                    {tech}
                                </Badge>
                            ))}
                        </BadgeGroup>
                    </div>

                    {/* Action links */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            variant="primary"
                            size="sm"
                            href={project.live}
                            external
                            style={{ background: project.accentColor, color: "#0A0A0F" }}
                        >
                            <ExternalLinkIcon />
                            Live Demo
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            href={project.github}
                            external
                        >
                            <GitHubIcon />
                            View Code
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}

// ─── Grid Project Card ────────────────────────────────────────
// Smaller card for non-featured projects
function GridCard({ project, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <article
            className={[
                "card rounded-xl overflow-hidden",
                "flex flex-col",
                "group cursor-default",
                "hover:border-(--border-medium)",
            ].join(" ")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={`Project: ${project.title}`}
        >
            {/* Visual header */}
            <div
                className={[
                    "relative flex items-center justify-center",
                    "h-36 overflow-hidden",
                    "border-b border-(--border-subtle)",
                ].join(" ")}
                style={{
                    background: `radial-gradient(ellipse at center, ${project.accentColor}10 0%, transparent 70%)`,
                }}
                aria-hidden="true"
            >
                <span
                    className={[
                        "text-5xl select-none",
                        "transition-transform duration-400",
                        hovered ? "scale-110" : "scale-100",
                    ].join(" ")}
                >
                    {project.emoji}
                </span>

                {/* Status + number row */}
                <div className="absolute top-3 right-3">
                    <Badge variant="status" status={project.status} />
                </div>
                <div className="absolute bottom-3 left-3">
                    <ProjectNumber index={index} />
                </div>

                {/* Accent line on hover */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                    style={{
                        background: hovered
                            ? `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`
                            : "transparent",
                    }}
                />
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-6">
                {/* Title */}
                <h3
                    className={[
                        "font-display font-bold text-base tracking-tight",
                        "text-(--text-primary) mb-2",
                        "group-hover:text-(--accent-primary)",
                        "transition-colors duration-200",
                    ].join(" ")}
                >
                    {project.title}
                </h3>

                {/* Short description */}
                <p className="text-sm text-(--text-secondary) leading-relaxed mb-4 flex-1">
                    {project.shortDesc}
                </p>

                {/* Tech stack */}
                <BadgeGroup className="mb-5">
                    {project.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="tech">
                            {tech}
                        </Badge>
                    ))}
                    {project.stack.length > 4 && (
                        <Badge variant="outline">
                            +{project.stack.length - 4}
                        </Badge>
                    )}
                </BadgeGroup>

                {/* Links */}
                <div className="flex items-center gap-2 pt-4 border-t border-(--border-subtle)">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                            "flex items-center gap-1.5",
                            "font-mono text-xs font-medium",
                            "text-(--text-secondary)",
                            "hover:text-(--text-primary)",
                            "transition-colors duration-150",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-(--accent-primary) rounded",
                        ].join(" ")}
                        aria-label={`${project.title} GitHub repository`}
                    >
                        <GitHubIcon />
                        Code
                    </a>

                    <span className="text-(--border-medium)" aria-hidden="true">·</span>

                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                            "flex items-center gap-1.5",
                            "font-mono text-xs font-medium",
                            "transition-colors duration-150",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-(--accent-primary) rounded",
                        ].join(" ")}
                        style={{ color: project.accentColor }}
                        aria-label={`${project.title} live demo`}
                    >
                        <ExternalLinkIcon />
                        Live Demo
                    </a>
                </div>
            </div>
        </article >
    );
}

// ─── Main Projects Section ────────────────────────────────────
export default function Projects() {
    const featuredProjects = PROJECTS.filter((p) => p.featured);
    const gridProjects = PROJECTS.filter((p) => !p.featured);

    // Stagger grid cards
    const gridRef = useRef(null);
    useStaggerReveal(gridRef, { staggerMs: 90, threshold: 0.05 });

    return (
        <section
            id="projects"
            className="section-padding bg-(--bg-secondary)"
            aria-labelledby="projects-heading"
        >
            <div className="container-main">

                {/* Section header */}
                <SectionHeader
                    label="Work"
                    number={3}
                    title="Things I've built."
                    titleAccent="built"
                    subtitle="A selection of projects across full stack development and AI integration."
                    id="projects-heading"
                />

                {/* ── Featured projects ── */}
                {featuredProjects.length > 0 && (
                    <div
                        className="space-y-6 mb-16"
                        role="list"
                        aria-label="Featured projects"
                    >
                        {featuredProjects.map((project, i) => (
                            <div
                                key={project.id}
                                className="reveal"
                                style={{ transitionDelay: `${i * 100}ms` }}
                                role="listitem"
                            >
                                <FeaturedCard project={project} index={i} />
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Grid divider ── */}
                {gridProjects.length > 0 && (
                    <div className="flex items-center gap-4 mb-10 reveal">
                        <div className="flex-1 h-px bg-(--border-subtle)" aria-hidden="true" />
                        <span className="font-mono text-xs tracking-widest text-(--text-tertiary) uppercase whitespace-nowrap">
                            Other Projects
                        </span>
                        <div className="flex-1 h-px bg-(--border-subtle)" aria-hidden="true" />
                    </div>
                )}

                {/* ── Grid projects ── */}
                {gridProjects.length > 0 && (
                    <div
                        ref={gridRef}
                        className={[
                            "grid gap-5",
                            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                        ].join(" ")}
                        role="list"
                        aria-label="Other projects"
                    >
                        {gridProjects.map((project, i) => (
                            <div key={project.id} role="listitem">
                                <GridCard
                                    project={project}
                                    index={featuredProjects.length + i}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* ── GitHub CTA ── */}
                <div className="flex justify-center mt-14 reveal">
                    <Button
                        variant="outline"
                        size="md"
                        href={`https://github.com/${PROJECTS[0]?.github?.split("github.com/")[1]?.split("/")[0] ?? ""
                            }`}
                        external
                        showArrow
                    >
                        <GitHubIcon />
                        See all projects on GitHub
                    </Button>
                </div>
            </div>
        </section>
    );
}