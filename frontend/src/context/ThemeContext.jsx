/* ============================================================
   src/context/ThemeContext.jsx
   Global theme state — persists to localStorage.
   Provides useTheme() hook to any component.
   ============================================================ */

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
    // 2. Respect OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Apply theme attribute to <html> whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const isDark  = theme === "dark";
  const isLight = theme === "light";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}