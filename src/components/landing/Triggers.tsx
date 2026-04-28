import { Baby, Wallet, ThumbsUp, KeyRound } from "lucide-react";

export function Triggers() {
  const cards = [
    {
      icon: Baby,
      title: "Bébé en route ou enfant en bas âge",
      text: "L'appartement devient trop petit. Vous avez besoin d'espace, d'une cour, et vite.",
    },
    {
      icon: Wallet,
      title: "Je paye 1 800$/mois pour engraisser quelqu'un d'autre",
      text: "Votre loyer augmente chaque année, mais votre capital n'avance pas d'un pouce.",
    },
    {
      icon: ThumbsUp,
      title: "Si eux ont pu le faire, on peut surement le faire",
      text: "Vos amis achètent. Vous avez de bons emplois. C'est votre tour de bâtir votre patrimoine.",
    },
    {
      icon: KeyRound,
      title: "On est enfin stabilisés — c'est le bon moment",
      text: "Fini les études, jobs stables, économies de côté. Vous êtes prêts pour la prochaine étape.",
    },
  ];

  return (
    <section className="py-24 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance uppercase tracking-widest">
            Vous vous reconnaissez ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La majorité de mes clients se trouvent dans l'une de ces 4 situations quand ils me contactent pour la première fois.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-navy-deep border border-border rounded-xl p-6 relative overflow-hidden group hover:border-crimson/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-elevate"
            >
              <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <card.icon className="w-6 h-6 text-crimson" />
              </div>
              <h3 className="text-lg font-bold mb-3">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
