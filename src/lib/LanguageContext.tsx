// Contexte de langue FR/EN. Provider à monter à la racine.
// Hook `useLanguage()` → `{ lang, setLang, t, ta }`.
// FR par défaut. Persistence via localStorage clé `intralys-lang`.

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Language } from "@/lib/translations";

const STORAGE_KEY = "intralys-lang";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (obj: { readonly fr: string; readonly en: string } | { fr: string; en: string }) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- nécessaire pour supporter as const
  ta: (obj: { readonly fr: any; readonly en: any }) => any;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en") return "en";
  } catch {
    // localStorage non disponible (SSR, iframe, etc.)
  }
  return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Silencieux si localStorage non disponible
    }
  };

  // Synchroniser l'attribut lang du document HTML
  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
  }, [lang]);

  // Fonction utilitaire pour traduire une chaîne
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- supporte les types as const
  const t = (obj: { readonly fr: any; readonly en: any }): any => obj[lang];

  // Fonction utilitaire pour traduire un tableau ou objet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- supporte les types as const
  const ta = (obj: { readonly fr: any; readonly en: any }): any => obj[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, ta }}>{children}</LanguageContext.Provider>
  );
}

// Hook pour accéder aux traductions dans les composants
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  }
  return context;
}
