/* ============================================================
   src/hooks/useTypewriter.js
   Custom hook for typewriter animation effect.

   Usage:
     const { displayText, isTyping } = useTypewriter(texts, {
       typeSpeed: 80,
       deleteSpeed: 40,
       pauseDuration: 2000,
     });
   ============================================================ */

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Constants ───────────────────────────────────────────────
const DEFAULT_OPTIONS = {
  typeSpeed:     80,    // ms per character while typing
  deleteSpeed:   40,    // ms per character while deleting (faster = snappier)
  pauseDuration: 2200,  // ms to pause at end of fully typed word
  startDelay:    600,   // ms delay before animation begins on mount
  loop:          true,  // whether to loop through texts indefinitely
};

// ─── Hook ────────────────────────────────────────────────────
/**
 * useTypewriter
 * @param {string[]} texts        - Array of strings to cycle through
 * @param {object}   options      - Optional config (see DEFAULT_OPTIONS)
 * @returns {{ displayText: string, isTyping: boolean, currentIndex: number }}
 */
export function useTypewriter(texts = [], options = {}) {
  // Merge user options with defaults
  const config = { ...DEFAULT_OPTIONS, ...options };

  // ── State ──────────────────────────────────────────────────
  const [displayText,   setDisplayText]   = useState("");
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [isDeleting,    setIsDeleting]    = useState(false);
  const [isTyping,      setIsTyping]      = useState(false);
  const [isPaused,      setIsPaused]      = useState(false);
  const [hasStarted,    setHasStarted]    = useState(false);

  // Ref to store timeout ID so we can clean it up properly
  const timeoutRef = useRef(null);

  // ── Guard — bail out if texts array is empty ───────────────
  if (!texts || texts.length === 0) {
    return { displayText: "", isTyping: false, currentIndex: 0 };
  }

  // ── Core animation logic ───────────────────────────────────
  const tick = useCallback(() => {
    const currentText = texts[currentIndex % texts.length];

    if (isDeleting) {
      // ── Deleting phase ──────────────────────────────────
      setDisplayText((prev) => prev.slice(0, prev.length - 1));

      if (displayText.length <= 1) {
        // Finished deleting — move to next word
        setIsDeleting(false);
        setIsTyping(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      // ── Typing phase ────────────────────────────────────
      setIsTyping(true);
      setDisplayText((prev) => currentText.slice(0, prev.length + 1));

      if (displayText.length >= currentText.length - 1) {
        // Finished typing — pause before deleting
        setIsTyping(false);

        if (config.loop || currentIndex < texts.length - 1) {
          setIsPaused(true);

          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, config.pauseDuration);

          return; // exit tick early — setTimeout handles next step
        }
      }
    }
  }, [displayText, isDeleting, currentIndex, texts, config]);

  // ── Effect — drive the animation with setInterval-like loop ─
  useEffect(() => {
    // Initial start delay — feels more intentional on page load
    if (!hasStarted) {
      timeoutRef.current = setTimeout(() => {
        setHasStarted(true);
      }, config.startDelay);
      return;
    }

    // Don't schedule next tick if we're in a pause phase
    if (isPaused) return;

    const speed = isDeleting ? config.deleteSpeed : config.typeSpeed;
    timeoutRef.current = setTimeout(tick, speed);

    // Cleanup — cancel pending timeout on every re-render
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    displayText,
    isDeleting,
    isPaused,
    hasStarted,
    currentIndex,
    tick,
    config.deleteSpeed,
    config.typeSpeed,
    config.startDelay,
  ]);

  // ── Cleanup on unmount ─────────────────────────────────────
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    displayText,        // the current string to render
    isTyping,           // true while actively adding characters
    currentIndex,       // which text is currently active (useful for syncing colors etc.)
  };
}

export default useTypewriter;