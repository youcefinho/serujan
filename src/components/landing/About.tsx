import { Heart, Eye, Zap, MapPin } from "lucide-react";
import mathisWhite from "@/assets/mathis-white.jpg";

const values = [
  { icon: Heart, label: "Famille" },
  { icon: Eye, label: "Transparence" },
  { icon: Zap, label: "Efficacité" },
];

export function About() {
  return (
    <section id="apropos" className="py-24 lg:py-32 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-2 border-2 border-crimson rounded-2xl translate-x-4 translate-y-4" />
          <div className="relative aspect-[4/5] bg-cream rounded-2xl overflow-hidden shadow-elevate">
            <img
              src={mathisWhite}
              alt="Portrait de Mathis Guimont"
              className="w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            </div>
            {/* Nouvelle génération badge */}
            <div className="absolute -left-6 top-12 bg-white text-navy p-5 rounded-2xl shadow-elevate max-w-[240px] transform -rotate-2 z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center text-white font-bold text-lg">
                  22
                </div>
                <div className="font-bold leading-tight">Nouvelle<br/>génération</div>
              </div>
              <p className="text-xs text-navy/70 font-medium">L'énergie et les stratégies d'aujourd'hui au service de vos projets.</p>
            </div>
          </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <span className="text-crimson text-sm font-bold uppercase tracking-widest">À propos</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase tracking-widest">
              Un courtier immobilier à Gatineau qui comprend vos enjeux.
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Mathis Guimont est <span className="text-foreground font-semibold">courtier immobilier résidentiel à Gatineau</span>,
              spécialisé pour les premiers acheteurs et les investisseurs. Avec une expertise marquée en marketing immobilier,
              il vous offre une visibilité maximale pour <span className="text-foreground">vendre à Gatineau</span> et un accompagnement
              stratégique pour <span className="text-foreground">acheter à Gatineau</span>.
            </p>
            <p>
              Évaluation de maison à Gatineau, recherche ciblée, négociation experte — son approche repose sur des conseils clairs,
              une écoute attentive et une stratégie adaptée à votre projet, que ce soit votre première propriété, un condo
              ou votre prochain investissement locatif dans l'Outaouais.
            </p>
          </div>

          <ul className="space-y-3 pt-2">
            {[
              "Une transaction de A à Z — vous n'avez qu'un seul interlocuteur",
              "Négociation agressive en votre faveur — pas juste ouvrir des portes",
              "Vos intérêts passent avant les miens — toujours",
              "Un investissement dont vous serez fier dans 10 ans"
            ].map((phrase, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-crimson/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-crimson" />
                </div>
                <span className="font-medium text-[15px]">{phrase}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 bg-navy text-foreground text-xs font-bold rounded border border-border">Connaissance du marché</span>
            <span className="px-3 py-1 bg-navy text-foreground text-xs font-bold rounded border border-border">Expert Marketing</span>
            <span className="px-3 py-1 bg-navy text-foreground text-xs font-bold rounded border border-border">Disponible 7j/7</span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {values.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-4 text-center hover:border-crimson transition">
                <Icon className="w-6 h-6 text-crimson mx-auto mb-2" />
                <div className="text-sm font-bold uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-border">
            <MapPin className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold">Bureau</div>
              <div className="text-muted-foreground">225 boul. de la Gappe, suite 102, Gatineau</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
