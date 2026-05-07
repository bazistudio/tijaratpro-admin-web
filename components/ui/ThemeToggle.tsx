"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:border-primary/50 transition-all hover:scale-110 active:scale-95 group shadow-sm"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="group-hover:rotate-[45deg] transition-transform duration-500" />
      ) : (
        <Moon size={18} className="group-hover:rotate-[15deg] transition-transform duration-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
