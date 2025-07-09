import React from "react";
import { ThemeProvider } from "./theme-provider";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
