const VARIANTS = {
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

  status: {
    Live: {
      wrapper: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/20",
      dot: "bg-emerald-400",
    },
    "In Progress": {
      wrapper: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20",
      dot: "bg-amber-400 animate-pulse",
    },
    Archived: {
      wrapper: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-[var(--text-tertiary)]/10 text-[var(--text-tertiary)] border border-[var(--text-tertiary)]/20",
      dot: "bg-[var(--text-tertiary)]",
    },
  },

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

  mono: [
    "inline-flex items-center gap-2",
    "text-xs font-mono font-semibold tracking-[0.12em] uppercase",
    "text-[var(--accent-primary)]",
  ].join(" "),

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
        "shrink-0",
        "w-1.5 h-1.5 rounded-full",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

// ─── Accent Line ─────────────────────────────────────────────
function AccentDash({ color }) {
  return (
    <span
      className="inline-block w-5 h-[1.5px] rounded-full shrink-0"
      style={{ background: color || "var(--accent-primary)" }}
      aria-hidden="true"
    />
  );
}

// ─── Main Badge Component ────────────────────────────────────
/**
 * Badge
 *
 * @prop {string}   variant   
 * @prop {string}   status    
 * @prop {boolean}  dot       
 * @prop {boolean}  dash     
 * @prop {string}   color     
 * @prop {string}   icon     
 * @prop {string}   className 
 * @prop {ReactNode}children  
 */
function Badge({
  variant = "outline",
  status = "Live",
  dot = false,
  dash = false,
  color = null,
  icon = null,
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
        {dash && <AccentDash color={color} />}

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
        {dot && <Dot className="bg-(--text-tertiary)" />}
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
      {dot && <Dot className="bg-(--text-secondary)" />}
      {children}
    </span>
  );
}


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