import { Award } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function ParentTeam() {
  const { t, ta } = useLanguage();
  const tr = translations.parentTeam;

  return (
    <section className="py-20 lg:py-28 bg-navy-deep border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
        <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(tr.title)}</h2>
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-crimson/20 to-crimson/5 border border-crimson/30 flex items-center justify-center">
            <Award className="w-12 h-12 text-crimson" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-4">{t(tr.teamName)}</h3>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">{t(tr.description)}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {(ta(tr.tags) as string[]).map((tag: string) => (
              <div key={tag} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson" />{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
