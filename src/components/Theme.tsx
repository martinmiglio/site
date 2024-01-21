"use client";

import { faLightbulb as lightModeBulb } from "@fortawesome/free-regular-svg-icons";
import { faLightbulb as darkModeBulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme, ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return (
    <NextThemeProvider attribute="class" disableTransitionOnChange={true}>
      {children}
    </NextThemeProvider>
  );
}

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <FontAwesomeIcon icon={lightModeBulb} className="h-4 w-4" />;
  }

  return (
    <button
      aria-label={resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
      className="transition-all duration-200 ease-in-out hover:text-theme-950 hover:dark:text-theme-50"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <FontAwesomeIcon
        icon={resolvedTheme === "dark" ? lightModeBulb : darkModeBulb}
        className="h-4 w-4"
      />
    </button>
  );
}
