/* ============================================================
   src/components/ui/SectionHeader.jsx
   Reusable section header used at the top of every section.

   Usage:
     <SectionHeader
       label="About Me"
       title="Crafting digital experiences."
       subtitle="A short supporting line goes here."
       align="left"        // "left" | "center"
       titleAccent="experiences" // word(s) to color in accent
     />
   ============================================================ */

import Badge from "./Badge";

// ─── Accent Word Highlighter ─────────────────────────────────
/**
 * Splits the title string and wraps the accent word(s) in a
 * styled span so part of the heading appears in lime accent color.
 *
 * Example:
 *   title="Crafting digital experiences."
 *   titleAccent="digital"
 *   → "Crafting " + <span>digital</span> + " experiences."
 */
function HighlightedTitle({ title, accent }) {
  // No accent word — render plain title
  if (!accent) {
    return <>{title}</>;
  }

  // Find accent word position (case-insensitive)
  const regex = new RegExp(`(${accent})`, "gi");
  const parts = title.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          // Accent word — lime color with italic Fraunces serif
          <span
            key={i}
            className="text-[var(--accent-primary)] italic"
            aria-hidden="false"
          >
            {part}
          </span>
        ) : (
          // Normal word
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Number Decoration ───────────────────────────────────────
// Large faded section number — appears behind the heading
// Adds editorial depth, like a magazine layout
function SectionNumber({ number }) {
  if (!number) return null;

  return (
    <span
      className={[
        "absolute -top-8 -left-2",
        "font-display font-bold",
        "text-[8rem] leading-none",
        "text-[var(--text-primary)]/[0.03]",
        "select-none pointer-events-none",
        "hidden lg:block",           // only on large screens
      ].join(" ")}
      aria-hidden="true"
    >
      {String(number).padStart(2, "0")}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────
/**
 * SectionHeader
 *
 * @prop {string}  label        - Mono uppercase label (e.g. "About Me")
 * @prop {string}  title        - Main heading text
 * @prop {string}  subtitle     - Optional supporting description
 * @prop {string}  titleAccent  - Word(s) in title to highlight in accent color
 * @prop {string}  align        - "left" (default) | "center"
 * @prop {number}  number       - Optional section number for bg decoration
 * @prop {string}  labelColor   - Custom color for the mono label
 * @prop {string}  className    - Additional wrapper classes
 * @prop {ReactNode} children   - Optional content below subtitle
 */
function SectionHeader({
  label        = "",
  title        = "",
  subtitle     = "",
  titleAccent  = "",
  align        = "left",
  number       = null,
  labelColor   = null,
  className    = "",
  children,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        "relative mb-14",                               // spacing below header
        isCenter ? "text-center mx-auto" : "text-left", // alignment
        className,
      ].join(" ")}
    >
      {/* ── Faded section number (decorative) ── */}
      <SectionNumber number={number} />

      {/* ── Mono label ── */}
      {label && (
        <div
          className={[
            "reveal mb-4",
            isCenter ? "flex justify-center" : "",
          ].join(" ")}
        >
          <Badge
            variant="mono"
            dash={!isCenter}   // show dash only on left-aligned headers
            color={labelColor}
          >
            {label}
          </Badge>
        </div>
      )}

      {/* ── Main Heading ── */}
      <h2
        className={[
          "reveal reveal-delay-1",
          "font-display font-bold",
          "text-[var(--text-primary)]",
          // Fluid type scale — big on desktop, readable on mobile
          "text-4xl sm:text-5xl lg:text-[3.5rem]",
          "leading-[1.05] tracking-tight",
          "mb-4",
          // Limit width for readability on center alignment
          isCenter ? "max-w-2xl mx-auto" : "max-w-3xl",
        ].join(" ")}
      >
        <HighlightedTitle title={title} accent={titleAccent} />
      </h2>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p
          className={[
            "reveal reveal-delay-2",
            "text-[var(--text-secondary)]",
            "text-base sm:text-lg",
            "leading-relaxed",
            "max-w-xl",
            isCenter ? "mx-auto" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}

      {/* ── Optional extra content (e.g. a CTA link) ── */}
      {children && (
        <div className="reveal reveal-delay-3 mt-6">
          {children}
        </div>
      )}

      {/* ── Decorative accent line under label ── */}
      {!isCenter && (
        <div
          className="reveal absolute -left-8 top-0 hidden xl:block"
          aria-hidden="true"
        >
          <div
            className="w-[2px] h-full min-h-[80px] rounded-full opacity-20"
            style={{
              background: labelColor
                ? `linear-gradient(180deg, ${labelColor}, transparent)`
                : "linear-gradient(180deg, var(--accent-primary), transparent)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SectionHeader;