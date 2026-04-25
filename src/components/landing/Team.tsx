import { Building2, Award, ArrowRight } from "lucide-react";
import mathisWhite from "@/assets/mathis-white.jpg";
import logoEquipeColor from "@/assets/logo-equipe-color.png";

export function Team() {
  return (
    <section id="equipe" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-crimson mb-3">Notre Équipe</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Des experts dédiés à votre succès.
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une expertise pointue combinée à une approche humaine pour vous accompagner à chaque étape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div className="relative group mx-auto w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-crimson rounded-2xl transform rotate-3 scale-105 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 shadow-elevate">
              <img
                src={mathisWhite}
                alt="Mathis Guimont, Courtier immobilier résidentiel"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4">
                <img src={logoEquipeColor} alt="L'Équipe" className="h-6 object-contain opacity-70 brightness-0 invert drop-shadow-md" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">Mathis Guimont</h3>
              <p className="text-crimson font-bold text-lg mb-6">Courtier immobilier résidentiel</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Passionné par l'immobilier et dévoué à la réussite de vos projets, je mets mon expertise du marché de l'Outaouais à votre service. Mon objectif : rendre votre transaction aussi simple, transparente et profitable que possible.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Accompagnement personnalisé</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    De la première visite à la signature chez le notaire, je suis à vos côtés.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Soutien d'une équipe performante</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Je vous fais bénéficier d'un réseau étendu et d'une force de frappe exceptionnelle.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-navy font-bold rounded-md hover:bg-crimson hover:text-primary-foreground transition-colors group"
              >
                Parler avec Mathis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
