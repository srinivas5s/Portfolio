import { useState, useRef } from "react";
import { SKILLS } from "../../constants/data";
import SectionHeader from "../ui/SectionHeader";

// ─── Proficiency label from level ────────────────────────────
function getLevelLabel(level) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 65) return "Proficient";
  return "Familiar";
}

// ─── Individual skill card ────────────────────────────────────
function SkillCard({ name, level, color, bg, icon, index }) {
  const label = getLevelLabel(level);

  return (
    <div
      className={[
        "card rounded-2xl p-5",
        "flex flex-col items-center gap-3",
        "hover:-translate-y-1 transition-transform duration-150",
      ].join(" ")}
      style={{
        borderTop: `2px solid ${color}30`,
        animationDelay: `${index * 35}ms`,
      }}
    >
      {/* Icon badge */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-mono font-bold"
        style={{ background: bg, color }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Skill name */}
      <span className="text-sm font-medium text-(--text-secondary) text-center leading-tight">
        {name}
      </span>

      {/* Level bar */}
      <div
        className="w-12 h-0.75 rounded-full bg-(--bg-hover) overflow-hidden"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name}: ${level}%`}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${level}%`, background: color }}
        />
      </div>

      {/* Proficiency label */}
      <span className="font-mono text-[10px] text-(--text-tertiary)">
        {label}
      </span>
    </div>
  );
}

// ─── Category filter tabs ─────────────────────────────────────
function CategoryTabs({ skills, active, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-2.5 mb-10"
      role="tablist"
      aria-label="Skill categories"
    >
      {skills.map((group, i) => (
        <button
          key={group.category}
          role="tab"
          aria-selected={active === i}
          onClick={() => onChange(i)}
          className={[
            "px-5 py-2 rounded-full text-sm font-medium",
            "border transition-all duration-150",
            active === i
              ? "bg-(--text-primary) text-(--bg-primary) border-(--text-primary)"
              : "bg-transparent text-(--text-secondary) border-(--border-subtle) hover:bg-(--bg-hover) hover:text-(--text-primary)",
          ].join(" ")}
        >
          {group.category}
        </button>
      ))}
    </div>
  );
}

// ─── Main Skills Section ──────────────────────────────────────
export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = SKILLS[activeIndex];

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

        {/* Category tabs */}
        <CategoryTabs
          skills={SKILLS}
          active={activeIndex}
          onChange={setActiveIndex}
        />

        {/* Skills grid */}
        <div
          key={activeGroup.category}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3"
          role="tabpanel"
          aria-label={`${activeGroup.category} skills`}
        >
          {activeGroup.items.map((skill, i) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={activeGroup.color}
              bg={`${activeGroup.color}18`}
              icon={activeGroup.icon}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}