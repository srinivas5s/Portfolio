import { useState, useEffect, useRef } from "react";

const DEFAULT_OPTIONS = {
  typeSpeed: 80,
  deleteSpeed: 40,
  pauseDuration: 2200,
  startDelay: 600,
  loop: true,
};

export function useTypewriter(texts = [], options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!texts.length) return;

    const currentText = texts[currentIndex];

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        setIsTyping(true);

        const nextText = currentText.slice(
          0,
          displayText.length + 1
        );

        setDisplayText(nextText);

        if (nextText === currentText) {
          setIsTyping(false);

          if (config.loop || currentIndex < texts.length - 1) {
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, config.pauseDuration);
          }
        }
      } else {
        setIsTyping(false);

        const nextText = displayText.slice(0, -1);

        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);

          setCurrentIndex((prev) => {
            if (config.loop) {
              return (prev + 1) % texts.length;
            }

            return Math.min(prev + 1, texts.length - 1);
          });
        }
      }
    }, isDeleting ? config.deleteSpeed : config.typeSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    texts,
    config.typeSpeed,
    config.deleteSpeed,
    config.pauseDuration,
    config.loop,
  ]);

  useEffect(() => {
    if (!texts.length) return;

    setDisplayText("");

    const timer = setTimeout(() => {
      setDisplayText("");
    }, config.startDelay);

    return () => clearTimeout(timer);
  }, [texts, config.startDelay]);

  return {
    displayText,
    isTyping,
    currentIndex,
  };
}

export default useTypewriter;