import { useLanguage } from "@/lib/LanguageContext";

// Toggle bilingue FR/EN — Standard Intralys §10.1
// Bouton compact pour la Navbar (desktop et mobile)
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition cursor-pointer"
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
    >
      <span className={lang === "fr" ? "text-crimson" : "text-muted-foreground"}>FR</span>
      <span className="text-muted-foreground">/</span>
      <span className={lang === "en" ? "text-crimson" : "text-muted-foreground"}>EN</span>
    </button>
  );
}
