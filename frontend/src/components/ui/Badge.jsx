/* ============================================================
   src/components/ui/Badge.jsx
   Reusable Badge / Tag / Pill component.

   Usage examples:
     <Badge variant="available">Available for Work</Badge>
     <Badge variant="status" status="Live">Live</Badge>
     <Badge variant="tech">React</Badge>
     <Badge variant="mono" color="#7B61FF">Backend</Badge>
     <Badge dot>Open to Remote</Badge>
   ============================================================ */

// ─── Variant Definitions ─────────────────────────────────────
const VARIANTS = {
  // "Available for Work" — hero section indicator
  available: {
    wrapper: [
      "inline-flex items-center gap-2",
      "px-3.5 py-1.5 rounded-full",
      "border border-[var(--accent-primary)]/30",
      "bg-[var(--accent-primary)]/8",
      "text-[var(--accent-primary)]",
      "text-xs font-medium tracking-widest uppercase",
      "font-mono",
    ].join(" "),
    dot: "bg-[var(--accent-primary)] animate-pulse-glow",
  },

  // Project / item status — "Live", "In Progress", "Archived"
  status: {
    Live: {
      wrapper: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/20",
      dot:     "bg-emerald-400",
    },
    "In Progress": {
      wrapper: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20",
      dot:     "bg-amber-400 animate-pulse",
    },
    Archived: {
      wrapper: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-[var(--text-tertiary)]/10 text-[var(--text-tertiary)] border border-[var(--text-tertiary)]/20",
      dot:     "bg-[var(--text-tertiary)]",
    },
  },

  // Tech stack tag — project cards
  tech: [
    "inline-flex items-center",
    "px-2.5 py-1 rounded-md",
    "text-xs font-medium font-mono tracking-wide",
    "bg-[var(--bg-hover)] text-[var(--text-secondary)]",
    "border border-[var(--border-subtle)]",
    "transition-all duration-150",
    "hover:border-[var(--accent-primary)]/40 hover:text-[var(--accent-primary)]",
    "cursor-default select-none",
  ].join(" "),

  // Section category label — e.g. skill category headers
  mono: [
    "inline-flex items-center gap-2",
    "text-xs font-mono font-semibold tracking-[0.12em] uppercase",
    "text-[var(--accent-primary)]",
  ].join(" "),

  // Outline pill — generic use
  outline: [
    "inline-flex items-center gap-1.5",
    "px-3 py-1 rounded-full",
    "text-xs font-medium tracking-wide",
    "text-[var(--text-secondary)]",
    "border border-[var(--border-subtle)]",
    "bg-transparent",
    "transition-colors duration-150",
    "hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]",
    "cursor-default select-none",
  ].join(" "),

  // Solid filled — used for highlights
  solid: [
    "inline-flex items-center gap-1.5",
    "px-3 py-1 rounded-full",
    "text-xs font-medium",
    "bg-[var(--bg-card)]",
    "text-[var(--text-secondary)]",
    "border border-[var(--border-subtle)]",
  ].join(" "),
};

// ─── Dot Indicator ───────────────────────────────────────────
function Dot({ className = "" }) {
  return (
    <span
      className={[
        "flex-shrink-0",
        "w-[6px] h-[6px] rounded-full",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

// ─── Accent Line ─────────────────────────────────────────────
// Small decorative dash before mono labels
function AccentDash({ color }) {
  return (
    <span
      className="inline-block w-5 h-[1.5px] rounded-full flex-shrink-0"
      style={{ background: color || "var(--accent-primary)" }}
      aria-hidden="true"
    />
  );
}

// ─── Main Badge Component ────────────────────────────────────
/**
 * Badge
 *
 * @prop {string}   variant   - "available"|"status"|"tech"|"mono"|"outline"|"solid"
 * @prop {string}   status    - For variant="status": "Live"|"In Progress"|"Archived"
 * @prop {boolean}  dot       - Show animated dot indicator
 * @prop {boolean}  dash      - Show accent dash (for mono variant)
 * @prop {string}   color     - Custom accent color (for mono variant)
 * @prop {string}   icon      - Optional emoji or character prefix
 * @prop {string}   className - Additional Tailwind classes
 * @prop {ReactNode}children  - Badge label text
 */
function Badge({
  variant   = "outline",
  status    = "Live",
  dot       = false,
  dash      = false,
  color     = null,
  icon      = null,
  className = "",
  children,
  ...rest
}) {

  // ── Available variant ──────────────────────────────────────
  if (variant === "available") {
    return (
      <span
        className={[VARIANTS.available.wrapper, className].join(" ")}
        role="status"
        aria-label="Currently available for work"
        {...rest}
      >
        <Dot className={VARIANTS.available.dot} />
        {children}
      </span>
    );
  }

  // ── Status variant ─────────────────────────────────────────
  if (variant === "status") {
    const cfg = VARIANTS.status[status] ?? VARIANTS.status["Live"];
    return (
      <span
        className={[cfg.wrapper, className].join(" ")}
        role="status"
        aria-label={`Project status: ${status}`}
        {...rest}
      >
        <Dot className={cfg.dot} />
        {status}
      </span>
    );
  }

  // ── Tech variant ───────────────────────────────────────────
  if (variant === "tech") {
    return (
      <span
        className={[VARIANTS.tech, className].join(" ")}
        {...rest}
      >
        {icon && (
          <span className="opacity-70" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>
    );
  }

  // ── Mono variant — section labels ─────────────────────────
  if (variant === "mono") {
    return (
      <span
        className={[VARIANTS.mono, className].join(" ")}
        style={color ? { color } : undefined}
        aria-label={typeof children === "string" ? children : undefined}
        {...rest}
      >
        {/* Dash before label */}
        {dash && <AccentDash color={color} />}

        {/* Icon prefix */}
        {icon && (
          <span aria-hidden="true">{icon}</span>
        )}

        {children}
      </span>
    );
  }

  // ── Solid variant ──────────────────────────────────────────
  if (variant === "solid") {
    return (
      <span
        className={[VARIANTS.solid, className].join(" ")}
        {...rest}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {dot && <Dot className="bg-[var(--text-tertiary)]" />}
        {children}
      </span>
    );
  }

  // ── Outline variant (default) ──────────────────────────────
  return (
    <span
      className={[VARIANTS.outline, className].join(" ")}
      {...rest}
    >
      {icon && (
        <span className="text-[0.9em]" aria-hidden="true">
          {icon}
        </span>
      )}
      {dot && <Dot className="bg-[var(--text-secondary)]" />}
      {children}
    </span>
  );
}

// ─── BadgeGroup ──────────────────────────────────────────────
/**
 * BadgeGroup
 * Wraps multiple Badge components in a consistent flex row.
 * Handles overflow wrapping automatically.
 *
 * Usage:
 *   <BadgeGroup>
 *     <Badge variant="tech">React</Badge>
 *     <Badge variant="tech">Node.js</Badge>
 *   </BadgeGroup>
 */
export function BadgeGroup({ children, className = "", gap = "gap-2", ...rest }) {
  return (
    <div
      className={["flex flex-wrap items-center", gap, className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Badge;