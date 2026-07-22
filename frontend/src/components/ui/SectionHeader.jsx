import Badge from "./Badge";

function HighlightedTitle({ title, accent }) {
  if (!accent) {
    return <>{title}</>;
  }

  const regex = new RegExp(`(${accent})`, "gi");
  const parts = title.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="text-(--accent-primary) italic"
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

function SectionNumber({ number }) {
  if (!number) return null;

  return (
    <span
      className={[
        "absolute -top-8 -left-2",
        "font-display font-bold",
        "text-[8rem] leading-none",
        "text-(--text-primary)/3",
        "select-none pointer-events-none",
        "hidden lg:block",          
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
 * @prop {string}  label        
 * @prop {string}  title        
 * @prop {string}  subtitle   
 * @prop {string}  titleAccent  
 * @prop {string}  align       
 * @prop {number}  number       
 * @prop {string}  labelColor  
 * @prop {string}  className  
 * @prop {ReactNode} children  
 */
function SectionHeader({
  label = "",
  title = "",
  subtitle = "",
  titleAccent = "",
  align = "left",
  number = null,
  labelColor = null,
  className = "",
  children,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        "relative mb-14",                              
        isCenter ? "text-center mx-auto" : "text-left", 
        className,
      ].join(" ")}
    >
      <SectionNumber number={number} />

      {label && (
        <div
          className={[
            "reveal mb-4",
            isCenter ? "flex justify-center" : "",
          ].join(" ")}
        >
          <Badge
            variant="mono"
            dash={!isCenter}   
            color={labelColor}
          >
            {label}
          </Badge>
        </div>
      )}

      <h2
        className={[
          "reveal reveal-delay-1",
          "font-display font-bold",
          "text-(--text-primary)",
          "text-4xl sm:text-5xl lg:text-[3.5rem]",
          "leading-[1.05] tracking-tight",
          "mb-4",
          isCenter ? "max-w-2xl mx-auto" : "max-w-3xl",
        ].join(" ")}
      >
        <HighlightedTitle title={title} accent={titleAccent} />
      </h2>

      {subtitle && (
        <p
          className={[
            "reveal reveal-delay-2",
            "text-(--text-secondary)",
            "text-base sm:text-lg",
            "leading-relaxed",
            "max-w-xl",
            isCenter ? "mx-auto" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}

      {children && (
        <div className="reveal reveal-delay-3 mt-6">
          {children}
        </div>
      )}

      {!isCenter && (
        <div
          className="reveal absolute -left-8 top-0 hidden xl:block"
          aria-hidden="true"
        >
          <div
            className="w-0.5 h-full min-h-20 rounded-full opacity-20"
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