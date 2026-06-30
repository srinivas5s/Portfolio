/* ============================================================
   src/components/sections/Contact.jsx
   Contact section with:
   - Formspree form submission (free, no backend needed)
   - Client-side validation
   - Loading / success / error states
   - Contact info cards
   - Availability status
   ============================================================ */

import { useState, useRef } from "react";
import { PERSONAL_INFO, CONTACT_INFO } from "../../constants/data";
import { useStaggerReveal } from "../../hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const FORMSPREE_ID = "xlgakevy";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// ─── Validation ───────────────────────────────────────────────
const VALIDATORS = {
  name: (v) => {
    if (!v.trim()) return "Name is required.";
    if (v.trim().length < 2) return "Name must be at least 2 characters.";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email.";
    return null;
  },
  subject: (v) => {
    if (!v.trim()) return "Subject is required.";
    return null;
  },
  message: (v) => {
    if (!v.trim()) return "Message is required.";
    if (v.trim().length < 20) return "Message must be at least 20 characters.";
    return null;
  },
};

function validate(fields) {
  const errors = {};
  Object.entries(VALIDATORS).forEach(([key, fn]) => {
    const err = fn(fields[key] ?? "");
    if (err) errors[key] = err;
  });
  return errors;
}

// ─── Form Field ───────────────────────────────────────────────
function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  rows,
  required = false,
}) {
  const isTextarea = type === "textarea";
  const hasError = touched && error;
  const isValid = touched && !error && value;

  const sharedClasses = [
    "w-full px-4 py-3 rounded-xl",
    "bg-[var(--bg-card)]",
    "border",
    "font-body text-sm text-(--text-primary)",
    "placeholder:text-(--text-tertiary)",
    "outline-none",
    "transition-all duration-200",
    // Border color states
    hasError ? "border-red-500/60 focus:border-red-500"
      : isValid ? "border-emerald-500/40 focus:border-emerald-500/60"
        : "border-(--border-subtle) focus:border-(--accent-primary)/60",
    // Glow on focus
    "focus:shadow-[0_0_0_3px_rgba(232,255,71,0.08)]",
    hasError ? "focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]" : "",
  ].join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={id}
        className="font-mono text-xs tracking-widest text-(--text-secondary) uppercase"
      >
        {label}
        {required && (
          <span className="text-(--accent-primary) ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Input or Textarea */}
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows ?? 5}
          required={required}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError ? "true" : undefined}
          className={[sharedClasses, "resize-none leading-relaxed"].join(" ")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError ? "true" : undefined}
          className={sharedClasses}
        />
      )}

      {/* Error message */}
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-mono text-xs text-red-400 flex items-center gap-1.5"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}

      {/* Valid checkmark */}
      {isValid && !hasError && (
        <p className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
          <span aria-hidden="true">✓</span>
          Looks good
        </p>
      )}
    </div>
  );
}

// ─── Contact Info Card ────────────────────────────────────────
function ContactInfoCard({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={[
        "flex items-center gap-4 p-4 rounded-xl",
        "border border-(--border-subtle)",
        "bg-(--bg-card)",
        "group",
        "hover:border-(--accent-primary)/40",
        "hover:bg-(--bg-hover)",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-(--accent-primary) rounded-xl",
      ].join(" ")}
      aria-label={`${label}: ${value}`}
    >
      {/* Icon */}
      <div
        className={[
          "w-10 h-10 rounded-lg shrink-0",
          "flex items-center justify-center",
          "bg-(--bg-hover)",
          "border border-(--border-subtle)",
          "text-lg",
          "group-hover:border-(--accent-primary)/30",
          "group-hover:bg-(--accent-primary)/5",
          "transition-all duration-200",
        ].join(" ")}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-0.5">
          {label}
        </p>
        <p
          className={[
            "text-sm font-medium truncate",
            "text-(--text-secondary)",
            "group-hover:text-(--accent-primary)",
            "transition-colors duration-150",
          ].join(" ")}
        >
          {value}
        </p>
      </div>

      {/* Arrow */}
      <span
        className={[
          "text-(--text-tertiary) text-sm shrink-0",
          "opacity-0 group-hover:opacity-100",
          "group-hover:translate-x-0.5",
          "transition-all duration-150",
        ].join(" ")}
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}

// ─── Success State ────────────────────────────────────────────
function SuccessMessage({ onReset }) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center",
        "text-center py-12 px-6",
        "rounded-2xl border border-emerald-500/20",
        "bg-emerald-500/5",
        "h-full min-h-100",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      {/* Success icon */}
      <div
        className={[
          "w-16 h-16 rounded-full mb-6",
          "flex items-center justify-center",
          "bg-emerald-500/10 border border-emerald-500/30",
          "text-2xl",
        ].join(" ")}
        aria-hidden="true"
      >
        ✓
      </div>

      <h3 className="font-display font-bold text-xl text-(--text-primary) mb-2">
        Message sent!
      </h3>
      <p className="text-(--text-secondary) text-sm leading-relaxed mb-8 max-w-xs">
        Thanks for reaching out. I'll get back to you within 24–48 hours.
      </p>

      <Button variant="ghost" size="sm" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────
function ContactForm() {
  const INITIAL_FIELDS = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // ── Field handlers ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    // Re-validate touched fields on change
    if (touched[name]) {
      const err = VALIDATORS[name]?.(value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = VALIDATORS[name]?.(value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields to show validation errors
    const allTouched = Object.fromEntries(
      Object.keys(INITIAL_FIELDS).map((k) => [k, true])
    );
    setTouched(allTouched);

    // Validate
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Submit
    setStatus("loading");

    try {
      // Use Formspree if ID is set, otherwise simulate success
      if (FORMSPREE_ID === "YOUR_FORM_ID") {
        // Demo mode — simulate API delay
        await new Promise((r) => setTimeout(r, 1500));
        setStatus("success");
        return;
      }

      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setStatus("success");
        setFields(INITIAL_FIELDS);
        setTouched({});
        setErrors({});
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFields(INITIAL_FIELDS);
    setTouched({});
    setErrors({});
  };

  // ── Success state ──────────────────────────────────────────
  if (status === "success") {
    return <SuccessMessage onReset={handleReset} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Your Name"
          id="name"
          value={fields.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          placeholder="John Doe"
          required
        />
        <FormField
          label="Email Address"
          id="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          placeholder="john@example.com"
          required
        />
      </div>

      {/* Subject */}
      <FormField
        label="Subject"
        id="subject"
        value={fields.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.subject}
        touched={touched.subject}
        placeholder="Project inquiry / Job opportunity / Collaboration"
        required
      />

      {/* Message */}
      <FormField
        label="Message"
        id="message"
        type="textarea"
        value={fields.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        touched={touched.message}
        placeholder="Tell me about your project, role, or idea..."
        rows={5}
        required
      />

      {/* Error banner */}
      {status === "error" && (
        <div
          className={[
            "flex items-center gap-3 px-4 py-3 rounded-xl",
            "bg-red-500/10 border border-red-500/20",
            "text-red-400 text-sm",
          ].join(" ")}
          role="alert"
        >
          <span aria-hidden="true">⚠</span>
          Something went wrong. Please try emailing me directly at{" "}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="underline hover:text-red-300 transition-colors"
          >
            {PERSONAL_INFO.email}
          </a>
        </div>
      )}

      {/* Submit */}
      <Button
        variant="primary"
        size="lg"
        loading={status === "loading"}
        className="w-full justify-center mt-1"
        type="submit"
        aria-label={
          status === "loading" ? "Sending message..." : "Send message"
        }
      >
        {status === "loading" ? "Sending..." : "Send Message →"}
      </Button>

      {/* Privacy note */}
      <p className="font-mono text-[10px] text-(--text-tertiary) text-center tracking-wide">
        Your information is never shared with third parties.
      </p>
    </form>
  );
}

// ─── Main Contact Section ─────────────────────────────────────
export default function Contact() {
  const infoRef = useRef(null);
  useStaggerReveal(infoRef, { staggerMs: 80, threshold: 0.1 });

  return (
    <section
      id="contact"
      className="section-padding bg-(--bg-secondary)"
      aria-labelledby="contact-heading"
    >
      <div className="container-main">

        {/* Section header */}
        <SectionHeader
          label="Get In Touch"
          number={5}
          title="Let's work together."
          titleAccent="work"
          subtitle="Have a project in mind or a role to discuss? I'm always happy to connect."
          id="contact-heading"
        />

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Info */}
          <div>
            {/* Availability badge */}
            {PERSONAL_INFO.availability && (
              <div className="reveal mb-8">
                <Badge variant="available">
                  Available for new opportunities
                </Badge>
              </div>
            )}

            {/* Heading */}
            <div className="reveal reveal-delay-1 mb-6">
              <h3
                className={[
                  "font-display font-bold",
                  "text-2xl sm:text-3xl tracking-tight",
                  "text-(--text-primary) mb-3",
                ].join(" ")}
              >
                Let's build something{" "}
                <span className="text-(--accent-primary) italic">
                  great together.
                </span>
              </h3>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                Whether you have a project in mind, a role to discuss, or just want
                to connect — drop me a message and I'll get back to you within
                24–48 hours.
              </p>
            </div>

            {/* Contact info cards */}
            <div
              ref={infoRef}
              className="flex flex-col gap-3 mb-8"
              role="list"
              aria-label="Contact methods"
            >
              {CONTACT_INFO.map((item) => (
                <div key={item.label} role="listitem">
                  <ContactInfoCard
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    href={item.href}
                  />
                </div>
              ))}
            </div>

            {/* Response time card */}
            <div
              className={[
                "reveal",
                "rounded-xl p-5",
                "border border-(--border-subtle)",
                "bg-(--bg-card)",
              ].join(" ")}
            >
              <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-3">
                What to expect
              </p>

              <ul className="space-y-2.5">
                {[
                  { icon: "⚡", text: "Response within 24–48 hours" },
                  { icon: "💬", text: "Happy to jump on a quick call" },
                  { icon: "🌍", text: "Open to remote roles worldwide" },
                  { icon: "🤝", text: "Available for freelance & full-time work" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-sm text-(--text-secondary)"
                  >
                    <span
                      className="text-base shrink-0 w-6 text-center"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal reveal-delay-2">
            <div
              className={[
                "rounded-2xl p-6 sm:p-8",
                "border border-(--border-subtle)",
                "bg-(--bg-card)",
              ].join(" ")}
            >
              {/* Form header */}
              <div className="mb-6">
                <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-1">
                  Send a message
                </p>
                <p className="text-sm text-(--text-secondary)">
                  Fill out the form below and I'll get back to you shortly.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}