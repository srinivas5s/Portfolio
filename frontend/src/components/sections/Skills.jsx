import { useState, useEffect } from "react";
import { SKILLS } from "../../constants/data";
import SectionHeader from "../ui/SectionHeader";

function SkillCard({ name, logo, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(timer);
  }, [index, name]);

  return (
    <div className="flex flex-col items-center gap-2.5" role="listitem">
      <div
        className={[
          "w-full aspect-square rounded-[18px]",
          "border border-(--border-subtle)",
          "flex items-center justify-center",
          "bg-(--bg-primary)",
          "hover:-translate-y-1.5 hover:scale-[1.04] hover:border-(--border-primary)",
          "cursor-default",
        ].join(" ")}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: `opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)`,
          transitionDelay: `${index * 60}ms`,
        }}
      >
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-[13px] font-medium text-(--text-secondary) text-center">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="skills"
      className="section-padding bg-(--bg-primary)"
      aria-labelledby="skills-heading"
    >
      <div className="container-main">

        <SectionHeader
          label="Expertise"
          number={2}
          title="Technologies I work with."
          titleAccent="Technologies"
          subtitle="Tools and languages I use daily — from database schema to polished UI."
          id="skills-heading"
        />

        <div
          className="flex flex-wrap gap-2.5 mb-10"
          role="tablist"
          aria-label="Skill categories"
        >
          {SKILLS.map((group, i) => (
            <button
              key={group.category}
              role="tab"
              aria-selected={activeIndex === i}
              onClick={() => setActiveIndex(i)}
              className={[
                "px-5 py-2 rounded-full text-sm font-medium",
                "border-[1.5px] transition-all duration-150",
                activeIndex === i
                  ? "bg-(--text-primary) text-(--bg-primary) border-(--text-primary)"
                  : "bg-transparent text-(--text-secondary) border-(--border-secondary) hover:border-(--border-primary) hover:text-(--text-primary)",
              ].join(" ")}
            >
              {group.category}
            </button>
          ))}
        </div>

        <div
          key={activeIndex}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
          role="list"
          aria-label={`${SKILLS[activeIndex].category} skills`}
        >
          {SKILLS[activeIndex].items.map((skill, i) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              logo={skill.logo}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}