import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function Process() {
  const { t, ta } = useLanguage();
  const steps = ta(translations.process.steps) as { title: string; desc: string }[];

  return (
    <section className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(translations.process.label)}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(translations.process.title)}</h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />
          {steps.map((s, i) => (
            <div key={i} className="relative text-center sm:text-left space-y-3">
              <div className="relative z-10 w-16 h-16 mx-auto sm:mx-0 rounded-full bg-gradient-crimson flex items-center justify-center font-black text-2xl shadow-crimson">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
