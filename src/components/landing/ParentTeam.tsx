import { Award } from "lucide-react";

// Section Équipe Parent — Standard Intralys §10.6
// Bannière immobilière du courtier (Royal LePage, RE/MAX, Sutton, etc.)
export function ParentTeam() {
  return (
    <section className="py-20 lg:py-28 bg-navy-deep border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="text-crimson text-sm font-bold uppercase tracking-widest">Notre bannière</span>
        <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">
          Une équipe, une vision
        </h2>

        <div className="mt-12 bg-card border border-border rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          {/* Logo placeholder — à remplacer par le logo de la bannière du courtier */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-crimson/20 to-crimson/5 border border-crimson/30 flex items-center justify-center">
            <Award className="w-12 h-12 text-crimson" strokeWidth={1.5} />
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-4">
            {/* Nom de l'équipe ou de la bannière — à personnaliser par client */}
            Équipe Immobilière
          </h3>

          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            Nous faisons partie d'un réseau immobilier reconnu à travers le Québec.
            Notre affiliation nous permet d'offrir une visibilité maximale à nos clients
            et un accès privilégié aux outils de mise en marché les plus performants du marché.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson" />
              Réseau provincial
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson" />
              Marketing avancé
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson" />
              Formation continue
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
