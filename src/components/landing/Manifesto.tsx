import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function Manifesto() {
  const { ta } = useLanguage();
  const blocks = ta(translations.manifesto) as { num: string; title: string; desc: string }[];

  return (
    <section className="bg-navy-deep">
      <div className="grid md:grid-cols-3">
        {blocks.map((b, i) => (
          <div
            key={b.title}
            className={`relative p-6 sm:p-10 lg:p-14 group overflow-hidden ${
              i === 1 ? "bg-crimson text-primary-foreground" : "bg-navy-deep"
            } ${i < 2 ? "md:border-r border-border" : ""} border-b md:border-b-0 border-border`}
          >
            <div className="space-y-6">
              <div
                className={`text-6xl sm:text-7xl lg:text-8xl font-black opacity-30 ${
                  i === 1 ? "text-primary-foreground" : "text-crimson"
                }`}
              >
                {b.num}
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">{b.title}</h3>
              <p
                className={`leading-relaxed ${
                  i === 1 ? "text-primary-foreground/90" : "text-muted-foreground"
                }`}
              >
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
