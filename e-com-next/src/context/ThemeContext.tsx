'use client'
import { createContext, useContext, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "@/theme-dark";
import lightTheme from "@/theme-light";

const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: "dark" as "dark" | "light",
});

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const toggleTheme = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeModeContext);