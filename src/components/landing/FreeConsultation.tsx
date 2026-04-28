import { CheckCircle, Calendar } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import mathisRed from "@/assets/mathis-red.jpg";

// Section « Votre première rencontre est gratuite » — Standard Intralys §10.8
export function FreeConsultation() {
  const { t, ta } = useLanguage();
  const tr = translations.freeConsultation;

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-navy-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte + badges */}
          <div className="text-center lg:text-left">
            <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
            <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">
              {t(tr.title)}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t(tr.subtitle)}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-10 mb-10">
              {(ta(tr.badges) as { label: string; desc: string }[]).map(({ label, desc }: { label: string; desc: string }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-5 hover:border-crimson transition">
                  <CheckCircle className="w-7 h-7 text-emerald-400 mx-auto lg:mx-0 mb-2" />
                  <div className="font-bold text-lg">{label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{desc}</div>
                </div>
              ))}
            </div>

            <button
              onClick={openCalendly}
              className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-crimson text-primary-foreground font-bold rounded-lg shadow-crimson hover:scale-[1.02] transition-transform text-lg uppercase tracking-widest cursor-pointer"
              aria-label={t(tr.cta)}
            >
              <Calendar className="w-6 h-6" />
              {t(tr.cta)}
            </button>

            {/* Contact direct */}
            <p className="mt-6 text-sm text-muted-foreground">
              {clientConfig.phone.display} &nbsp;|&nbsp; {clientConfig.email}
            </p>
          </div>

          {/* Photo Mathis — fond rouge */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 bg-crimson/15 rounded-full blur-3xl" />
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-2xl shadow-elevate">
              <img
                src={mathisRed}
                alt={`${clientConfig.name}, ${t(clientConfig.title)}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              {/* Badge bas */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-deep/90 to-transparent">
                <div className="text-sm font-semibold">{t(tr.title)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
