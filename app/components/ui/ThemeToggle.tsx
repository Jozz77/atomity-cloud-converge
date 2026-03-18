"use client";

import { useTheme } from "../providers/ThemeProvider";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border-primary bg-bg-tertiary text-text-secondary transition-all duration-300 hover:text-text-primary hover:bg-bg-secondary hover:scale-110 hover:shadow-lg active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      <HiOutlineSun
        size={18}
        className={`absolute transition-all duration-300 ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
      <HiOutlineMoon
        size={18}
        className={`absolute transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
