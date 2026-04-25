import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Marc Tremblay",
    quartier: "Premier achat · Aylmer",
    rating: 5,
    text: "Mathis nous a accompagnés du début à la fin pour notre première maison. Patient, à l'écoute et toujours disponible — il a vraiment rendu le processus sans stress comme promis !",
    initials: "ST",
  },
  {
    name: "Karine Lavoie",
    quartier: "Vente d'un condo · Hull",
    rating: 5,
    text: "Vendu en 11 jours au-dessus du prix demandé. Sa stratégie marketing et ses photos professionnelles ont fait toute la différence. Un courtier qui livre.",
    initials: "KL",
  },
  {
    name: "David Bouchard",
    quartier: "Investisseur · Gatineau",
    rating: 5,
    text: "J'ai acheté 2 plex avec Mathis cette année. Son analyse des chiffres et sa connaissance du marché locatif de l'Outaouais sont impressionnantes. Recommandé à 100 %.",
    initials: "DB",
  },
  {
    name: "Émilie Roy",
    quartier: "Premier achat · Buckingham",
    rating: 5,
    text: "Comme première acheteuse, j'avais 1000 questions. Mathis a pris le temps de tout m'expliquer sans jargon. Je me suis sentie en confiance à chaque étape.",
    initials: "ER",
  },
  {
    name: "Patrick & Julie Gagnon",
    quartier: "Maison familiale · Aylmer",
    rating: 5,
    text: "Service exceptionnel. Mathis a négocié une réduction de 15 000 $ sur le prix d'achat et trouvé des défauts cachés à l'inspection. Mieux qu'on espérait !",
    initials: "PG",
  },
];

const ventesRecentes = [
  { quartier: "Hull", type: "Condo 2 ch.", prix: "385 000 $", delai: "11 jours" },
  { quartier: "Aylmer", type: "Maison unifamiliale", prix: "542 000 $", delai: "18 jours" },
  { quartier: "Gatineau", type: "Plex (3 logements)", prix: "725 000 $", delai: "9 jours" },
  { quartier: "Buckingham", type: "Bungalow rénové", prix: "415 000 $", delai: "14 jours" },
];

export function Testimonials() {
  return (
    <section id="temoignages" className="py-24 lg:py-32 bg-navy-deep relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-crimson/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">
            Témoignages
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            Ils ont fait confiance à Mathis.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus de 50 avis 5 étoiles de premiers acheteurs, vendeurs et investisseurs de l'Outaouais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
          {testimonials.slice(3).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <span className="text-crimson text-sm font-bold uppercase tracking-widest">
              Vendu récemment
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">
              Des résultats concrets dans l'Outaouais.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ventesRecentes.map((v, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-crimson transition-all hover:shadow-crimson"
              >
                <div className="absolute top-4 right-4 px-2 py-1 bg-crimson/10 border border-crimson/30 rounded-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-crimson">
                    Vendu
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {v.quartier}
                </div>
                <div className="mt-2 text-lg font-bold text-foreground">{v.type}</div>
                <div className="mt-4 text-2xl sm:text-3xl font-bold text-crimson">{v.prix}</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Vendu en {v.delai}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  quartier,
  rating,
  text,
  initials,
}: {
  name: string;
  quartier: string;
  rating: number;
  text: string;
  initials: string;
}) {
  return (
    <div className="relative bg-card border border-border rounded-2xl p-5 sm:p-8 hover:border-crimson/50 transition-all hover:shadow-elevate">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-crimson/20" />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-crimson text-crimson" />
        ))}
      </div>

      <p className="text-foreground/90 leading-relaxed mb-6">« {text} »</p>

      <div className="flex items-center gap-3 pt-6 border-t border-border">
        <div className="w-11 h-11 rounded-full bg-gradient-crimson flex items-center justify-center text-sm font-bold text-primary-foreground">
          {initials}
        </div>
        <div>
          <div className="font-bold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            {quartier}
          </div>
        </div>
      </div>
    </div>
  );
}
