import { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_OPTIONS = {
  threshold: 0.12,
  rootMargin: "0px",
  triggerOnce: true,
  className: "in-view",
};

/**
 *
 * @param {React.RefObject} [ref]     
 *                                      
 * @param {object}          [options] 
 *
 * @returns {boolean} isVisible      
 */
export function useScrollReveal(ref = null, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return; 
    if (!ref.current) return;

    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (config.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!config.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, config.threshold, config.rootMargin, config.triggerOnce]);

  return isVisible;
}


export function useGlobalScrollReveal(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal");

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(config.className);

              if (config.triggerOnce) {
                observer.unobserve(entry.target);
              }
            } else if (!config.triggerOnce) {
              entry.target.classList.remove(config.className);
            }
          });
        },
        {
          threshold: config.threshold,
          rootMargin: config.rootMargin,
        }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(initTimeout);
  }, [config.threshold, config.rootMargin, config.triggerOnce, config.className]);
}


export function useStaggerReveal(containerRef, options = {}) {
  const { staggerMs = 80, threshold = 0.1, triggerOnce = true } = options;

  useEffect(() => {
    if (!containerRef?.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children);

    children.forEach((child, index) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
      child.style.transition = `opacity 0.6s ease ${index * staggerMs}ms, transform 0.6s ease ${index * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });

          if (triggerOnce) observer.unobserve(container);
        } else if (!triggerOnce) {
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


export function useScrollProgress() {
  const [scrollPct, setScrollPct] = useState(0);

  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const top = el.scrollTop || document.body.scrollTop;
    const height = el.scrollHeight - el.clientHeight;

    if (height <= 0) {
      setScrollPct(100);
      return;
    }

    setScrollPct(Math.min(100, Math.round((top / height) * 100)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrollPct;
}


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