import { useState, useEffect, useRef, useCallback } from "react";

// ─── Default Observer Options ────────────────────────────────
const DEFAULT_OPTIONS = {
  threshold: 0.12,   // % of element visible before triggering
  rootMargin: "0px",  // margin around root viewport
  triggerOnce: true,   // if true, won't re-hide on scroll up (recommended)
  className: "in-view", // class toggled on the element
};

// ─── Hook ────────────────────────────────────────────────────
/**
 * useScrollReveal
 *
 * @param {React.RefObject} [ref]     - Optional specific element ref.
 *                                      If omitted, targets all `.reveal` elements globally.
 * @param {object}          [options] - Optional IntersectionObserver config.
 *
 * @returns {boolean} isVisible       - Only meaningful in ref mode.
 */
export function useScrollReveal(ref = null, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const [isVisible, setIsVisible] = useState(false);

  // ── Ref mode — observe a single specific element ───────────
  useEffect(() => {
    if (!ref) return; // global mode — handled separately below
    if (!ref.current) return;

    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Unobserve after first trigger if triggerOnce is set
          if (config.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!config.triggerOnce) {
          // Allow re-hiding if triggerOnce is false
          setIsVisible(false);
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup — disconnect observer when component unmounts
    return () => observer.disconnect();
  }, [ref, config.threshold, config.rootMargin, config.triggerOnce]);

  return isVisible;
}

// ─── Global Reveal Hook ───────────────────────────────────────

export function useGlobalScrollReveal(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => {
    // Small timeout to ensure DOM is fully painted before observing
    const initTimeout = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal");

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add the visible class
              entry.target.classList.add(config.className);

              // Stop observing this element if triggerOnce
              if (config.triggerOnce) {
                observer.unobserve(entry.target);
              }
            } else if (!config.triggerOnce) {
              // Remove class to allow re-animation on scroll up
              entry.target.classList.remove(config.className);
            }
          });
        },
        {
          threshold: config.threshold,
          rootMargin: config.rootMargin,
        }
      );

      // Observe every .reveal element on the page
      elements.forEach((el) => observer.observe(el));

      // Cleanup
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(initTimeout);
  }, [config.threshold, config.rootMargin, config.triggerOnce, config.className]);
}

// ─── Stagger Children Hook ────────────────────────────────────

export function useStaggerReveal(containerRef, options = {}) {
  const { staggerMs = 80, threshold = 0.1, triggerOnce = true } = options;

  useEffect(() => {
    if (!containerRef?.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children);

    // Set initial hidden state and stagger delay on each child
    children.forEach((child, index) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
      child.style.transition = `opacity 0.6s ease ${index * staggerMs}ms, transform 0.6s ease ${index * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal all children — CSS transition + delay handles stagger
          children.forEach((child) => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });

          if (triggerOnce) observer.unobserve(container);
        } else if (!triggerOnce) {
          // Reset children if scrolled back up
          children.forEach((child) => {
            child.style.opacity = "0";
            child.style.transform = "translateY(24px)";
          });
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef, staggerMs, threshold, triggerOnce]);
}

// ─── useScrollProgress ───────────────────────────────────────

export function useScrollProgress() {
  const [scrollPct, setScrollPct] = useState(0);

  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const top = el.scrollTop || document.body.scrollTop;
    const height = el.scrollHeight - el.clientHeight;

    // Guard against division by zero on very short pages
    if (height <= 0) {
      setScrollPct(100);
      return;
    }

    setScrollPct(Math.min(100, Math.round((top / height) * 100)));
  }, []);

  useEffect(() => {
    // Passive listener — doesn't block scroll paint
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on mount to set initial value

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrollPct;
}

// ─── useActiveSection ─────────────────────────────────────────

export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let currentSection = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) return;

        if (scrollPosition >= section.offsetTop) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
}

export default useScrollReveal;