"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type LanguageType = "en" | "ar";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>("en");

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
