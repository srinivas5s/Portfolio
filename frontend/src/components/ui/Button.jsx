import { forwardRef } from "react";

const VARIANTS = {
    primary: [
        "bg-[var(--accent-primary)] text-[var(--bg-primary)]",
        "font-semibold",
        "hover:brightness-110 hover:-translate-y-[2px]",
        "hover:shadow-[0_8px_24px_rgba(232,255,71,0.35)]",
        "active:translate-y-0 active:brightness-95",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]",
    ].join(" "),

    outline: [
        "bg-transparent text-[var(--text-primary)]",
        "border border-[var(--border-medium)]",
        "font-medium",
        "hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
        "hover:-translate-y-[2px]",
        "hover:shadow-[0_8px_24px_rgba(232,255,71,0.12)]",
        "active:translate-y-0",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]",
    ].join(" "),

    ghost: [
        "bg-transparent text-[var(--text-secondary)]",
        "font-medium",
        "hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]",
        "active:bg-[var(--bg-card)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--border-medium)]",
    ].join(" "),

    danger: [
        "bg-transparent text-red-400",
        "border border-red-400/30",
        "font-medium",
        "hover:bg-red-400/10 hover:border-red-400",
        "hover:-translate-y-[2px]",
        "focus-visible:ring-2 focus-visible:ring-red-400",
    ].join(" "),

    icon: [
        "bg-transparent text-[var(--text-secondary)]",
        "border border-[var(--border-subtle)]",
        "hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
        "hover:-translate-y-[2px]",
        "hover:shadow-[0_6px_20px_rgba(232,255,71,0.15)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]",
        "rounded-full",
        "!p-0",
    ].join(" "),
};

// ─── Size Styles ─────────────────────────────────────────────
const SIZES = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",

    "icon-sm": "w-8 h-8 text-sm",
    "icon-md": "w-10 h-10 text-base",
    "icon-lg": "w-12 h-12 text-lg",
};

// ─── Loading Spinner ─────────────────────────────────────────
function Spinner({ size = "sm" }) {
    const dim = size === "lg" ? "w-5 h-5" : "w-4 h-4";
    return (
        <svg
            className={`${dim} animate-spin`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
    );
}

// ─── Arrow Icon ───────────────────────────────────────────────
function ArrowIcon({ direction = "right" }) {
    const rotations = {
        right: "rotate-0",
        left: "rotate-180",
        up: "-rotate-90",
        down: "rotate-90",
    };

    return (
        <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${rotations[direction]}`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── Download Icon ────────────────────────────────────────────
function DownloadIcon() {
    return (
        <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M8 2v8M5 7l3 3 3-3M3 12h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── External Link Icon ───────────────────────────────────────
function ExternalIcon() {
    return (
        <svg
            className="w-3 h-3 opacity-60"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── Main Button Component ────────────────────────────────────
/**
 * Button
 *
 * @prop {string}       variant     
 * @prop {string}       size      
 * @prop {string}       href        
 * @prop {boolean}      external   
 * @prop {boolean}      loading     
 * @prop {boolean}      disabled    
 * @prop {boolean}      showArrow 
 * @prop {boolean}      showDownload
 * @prop {string}       className  
 * @prop {ReactNode}    children    
 */
const Button = forwardRef(function Button(
    {
        variant = "primary",
        size = "md",
        href = null,
        external = false,
        loading = false,
        disabled = false,
        showArrow = false,
        showDownload = false,
        className = "",
        children,
        onClick,
        ...rest
    },
    ref
) {
    const isIconVariant = variant === "icon";
    const resolvedSize = isIconVariant
        ? SIZES[`icon-${size}`] ?? SIZES["icon-md"]
        : SIZES[size] ?? SIZES["md"];

    const baseClasses = [
        "inline-flex items-center justify-center",
        "font-body leading-none tracking-wide",
        isIconVariant ? "" : "rounded-lg",
        "transition-all duration-200 ease-out",
        disabled || loading ? "cursor-not-allowed" : "cursor-pointer",
        disabled ? "opacity-40" : "opacity-100",
        "group",
        "border-0 outline-none appearance-none",
        "select-none",
    ].join(" ");

    const classes = [
        baseClasses,
        VARIANTS[variant] ?? VARIANTS.primary,
        resolvedSize,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const content = (
        <>
            {loading && <Spinner size={size} />}

            <span
                className={[
                    "inline-flex items-center gap-inherit",
                    // Keep layout stable while loading
                    loading ? "opacity-0 absolute" : "opacity-100",
                ].join(" ")}
                style={{ gap: "inherit" }}
            >
                {children}
            </span>

            {!loading && showDownload && <DownloadIcon />}
            {!loading && showArrow && <ArrowIcon />}
            {!loading && external && !isIconVariant && <ExternalIcon />}
        </>
    );

    if (href) {
        const anchorProps = external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

        return (
            <a
                ref={ref}
                href={disabled || loading ? undefined : href}
                className={classes}
                aria-disabled={disabled || loading}
                onClick={disabled || loading ? (e) => e.preventDefault() : onClick}
                {...anchorProps}
                {...rest}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            ref={ref}
            type={rest.type ?? "button"}
            className={classes}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-busy={loading}
            onClick={onClick}
            {...rest}
        >
            {content}
        </button>
    );
});

export { ArrowIcon, DownloadIcon, ExternalIcon, Spinner };

export default Button;