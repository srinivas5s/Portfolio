import { useRef, useState, useEffect } from "react";
import { SKILLS } from "../../constants/data";
import {
  useScrollReveal,
  useStaggerReveal
} from "../../hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";
import Badge from "../ui/Badge";

// ─── Proficiency Legend ───────────────────────────────────────
const PROFICIENCY_LEVELS = [
  { label: "Familiar", min: 0, max: 65, color: "#4A4A5A" },
  { label: "Proficient", min: 65, max: 80, color: "#7B61FF" },
  { label: "Advanced", min: 80, max: 90, color: "#00D4AA" },
  { label: "Expert", min: 90, max: 100, color: "#E8FF47" },
];

function getProficiencyLabel(level) {
  return (
    PROFICIENCY_LEVELS.find((p) => level >= p.min && level <= p.max)
    ?? PROFICIENCY_LEVELS[0]
  );
}

function Legend() {
  return (
    <div
      className={[
        "flex flex-wrap items-center gap-x-6 gap-y-2",
        "mb-12 reveal",
      ].join(" ")}
      aria-label="Skill proficiency legend"
      role="list"
    >
      <span className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mr-2">
        Proficiency:
      </span>

      {PROFICIENCY_LEVELS.map((level) => (
        <div
          key={level.label}
          className="flex items-center gap-2"
          role="listitem"
        >
          {/* Color swatch */}
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: level.color }}
            aria-hidden="true"
          />
          <span className="font-mono text-xs text-(--text-secondary)">
            {level.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────
function SkillBar({ name, level, categoryColor, animate, index }) {
  const proficiency = getProficiencyLabel(level);

  return (
    <div
      className="group"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        {/* Skill name */}
        <span
          className={[
            "text-sm font-medium",
            "text-(--text-secondary)",
            "group-hover:text-(--text-primary)",
            "transition-colors duration-150",
          ].join(" ")}
        >
          {name}
        </span>

        {/* Percentage + proficiency label */}
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[10px]"
            style={{ color: proficiency.color }}
          >
            {proficiency.label}
          </span>
          <span className="font-mono text-xs text-(--text-tertiary)">
            {level}%
          </span>
        </div>
      </div>

      {/* Track */}
      <div
        className={[
          "relative h-1.25 rounded-full overflow-hidden",
          "bg-(--bg-hover)",
        ].join(" ")}
        role="progressbar"
        aria-valuenow={animate ? level : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency: ${level}%`}
      >
        {/* Fill bar */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            // Animate width from 0 to level on trigger
            width: animate ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${categoryColor}99, ${categoryColor})`,
            transition: animate
              ? `width 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${index * 60}ms`
              : "none",
            boxShadow: animate ? `0 0 8px ${categoryColor}60` : "none",
          }}
        />

        {/* Glint — subtle shine on fill bar */}
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden pointer-events-none"
          style={{ width: animate ? `${level}%` : "0%" }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Category Card ────────────────────────────────────────────
function CategoryCard({ category, color, icon, items }) {
  // Ref for this card — triggers bar animation when card enters view
  const cardRef = useRef(null);
  const isVisible = useScrollReveal(cardRef, { threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={[
        "card rounded-2xl p-6",
        "flex flex-col gap-6",
        // Left accent border using category color
        "border-l-2",
      ].join(" ")}
      style={{ borderLeftColor: color }}
      aria-label={`${category} skills`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Icon badge */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono font-bold"
            style={{
              background: `${color}15`,
              color,
              border: `1px solid ${color}30`,
            }}
            aria-hidden="true"
          >
            {icon}
          </div>

          {/* Category name */}
          <Badge variant="mono" color={color} dash>
            {category}
          </Badge>
        </div>

        {/* Item count */}
        <span
          className="font-mono text-xs text-(--text-tertiary)"
          aria-label={`${items.length} skills`}
        >
          {items.length} skills
        </span>
      </div>

      {/* Skill bars */}
      <div
        className="space-y-4"
        role="list"
        aria-label={`${category} skill levels`}
      >
        {items.map((skill, i) => (
          <div key={skill.name} role="listitem">
            <SkillBar
              name={skill.name}
              level={skill.level}
              categoryColor={color}
              animate={isVisible}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Card footer — avg proficiency */}
      <div
        className={[
          "pt-4 mt-auto",
          "border-t border-(--border-subtle)",
          "flex items-center justify-between",
        ].join(" ")}
      >
        <span className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase">
          Avg. Proficiency
        </span>

        {/* Average level bar */}
        <div className="flex items-center gap-2">
          {/* Mini bar */}
          <div className="w-16 h-1 rounded-full bg-(--bg-hover) overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: isVisible
                  ? `${Math.round(items.reduce((s, i) => s + i.level, 0) / items.length)}%`
                  : "0%",
                background: color,
              }}
            />
          </div>

          <span
            className="font-mono text-xs font-semibold"
            style={{ color }}
          >
            {Math.round(
              items.reduce((sum, item) => sum + item.level, 0) / items.length
            )}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Tools Strip ─────────────────────────────────────────────
// Flat list of additional tools below the main grid
const EXTRA_TOOLS = [
  "VS Code", "Figma", "Postman", "GitHub Actions",
  "Vercel", "Netlify", "npm", "ESLint", "Prettier",
];

function ToolsStrip() {
  const ref = useRef(null);
  useStaggerReveal(ref, { staggerMs: 50, threshold: 0.3 });

  return (
    <div className="mt-16 reveal">
      {/* Label */}
      <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-5">
        Also comfortable with
      </p>

      {/* Tools list */}
      <div
        ref={ref}
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Additional tools"
      >
        {EXTRA_TOOLS.map((tool) => (
          <div key={tool} role="listitem">
            <Badge variant="outline">
              {tool}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Skills Section ──────────────────────────────────────
export default function Skills() {
  // Stagger the category cards on scroll
  const gridRef = useRef(null);
  useStaggerReveal(gridRef, { staggerMs: 80, threshold: 0.05 });

  return (
    <section
      id="skills"
      className="section-padding bg-(--bg-primary)"
      aria-labelledby="skills-heading"
    >
      <div className="container-main">

        {/* Section header */}
        <SectionHeader
          label="Expertise"
          number={2}
          title="Technologies I work with."
          titleAccent="Technologies"
          subtitle="Tools and languages I use daily — from database schema to polished UI."
          id="skills-heading"
        />

        {/* Proficiency legend */}
        <Legend />

        {/* Category cards grid */}
        <div
          ref={gridRef}
          className={[
            "grid gap-5",
            "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
          ].join(" ")}
          role="list"
          aria-label="Skill categories"
        >
          {SKILLS.map((skillGroup) => (
            <div key={skillGroup.category} role="listitem">
              <CategoryCard
                category={skillGroup.category}
                color={skillGroup.color}
                icon={skillGroup.icon}
                items={skillGroup.items}
              />
            </div>
          ))}
        </div>

        {/* Extra tools strip */}
        <ToolsStrip />
      </div>
    </section>
  );
}