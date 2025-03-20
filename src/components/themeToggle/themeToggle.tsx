"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Only show the component after it's mounted on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering anything until client-side
  if (!mounted) {
    return <div className="w-6 h-6" />; // Placeholder with same dimensions
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className="flex items-center h-12 w-14 relative justify-center group cursor-pointer hover:bg-muted/70 select-none"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon className="rotate-0 scale-100 transition-all" />
      ) : (
        <Sun className="rotate-0 scale-100 transition-all" />
      )}
      <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
        <span>{theme === "light" ? "Dark" : "Light"}</span>
      </div>
    </div>
  );
}
