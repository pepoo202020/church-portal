import React from "react";
import { ThemeProvider } from "./theme-provider";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        {children}
        <Toaster richColors position="bottom-right" />
      </LanguageProvider>
    </ThemeProvider>
  );
}
