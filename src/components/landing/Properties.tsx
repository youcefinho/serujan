import { MapPin, Bed, Bath, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const CENTRIS_URL = "https://www.centris.ca/fr";

const properties = [
  { price: 425000, address: "123 Rue de l'Exemple, Gatineau", beds: 3, baths: 2, type: { fr: "Maison unifamiliale", en: "Single family home" } },
  { price: 349000, address: "456 Boulevard Placeholder, Hull", beds: 2, baths: 1, type: { fr: "Condo", en: "Condo" } },
  { price: 575000, address: "789 Avenue Modèle, Aylmer", beds: 4, baths: 3, type: { fr: "Maison unifamiliale", en: "Single family home" } },
];

const fmt = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(v);

export function Properties() {
  const { t } = useLanguage();
  const tr = translations.properties;

  return (
    <section className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
          <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(tr.title)}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t(tr.subtitle)}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {properties.map((prop, i) => (
            <div key={i} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-crimson transition">
              <div className="relative h-48 bg-gradient-to-br from-navy-deep via-card to-navy-deep overflow-hidden">
                <div className="absolute inset-0 bg-crimson/5 group-hover:bg-crimson/10 transition" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-crimson text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">{t(prop.type)}</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-2xl font-black text-crimson">{fmt(prop.price)}</div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-crimson" /><span>{prop.address}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                  <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {prop.beds} {t(tr.beds)}</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {prop.baths} {t(tr.baths)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href={CENTRIS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform uppercase tracking-widest" aria-label={t(tr.cta)}>
            <ExternalLink className="w-5 h-5" />{t(tr.cta)}
          </a>
        </div>
      </div>
    </section>
  );
}
