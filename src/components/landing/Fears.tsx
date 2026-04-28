import { MessageSquareWarning, ShieldAlert, BadgeDollarSign } from "lucide-react";

export function Fears() {
  const cards = [
    {
      icon: MessageSquareWarning,
      title: "Peur d'être jugé pour votre choix",
      text: "Votre famille va avoir des opinions. Mon travail c'est de vous donner les arguments pour défendre votre choix avec des chiffres.",
    },
    {
      icon: ShieldAlert,
      title: "Peur du vice caché qui ruine tout",
      text: "C'est pour ça qu'on ne signe rien sans inspection rigoureuse. J'ai un réseau d'experts qui protège votre investissement à chaque étape.",
    },
    {
      icon: BadgeDollarSign,
      title: "Peur de ne pas être prêt financièrement",
      text: "Avant de signer quoi que ce soit, on va ensemble dans les chiffres complets. Pas de mauvaise surprise. Jamais.",
    },
  ];

  return (
    <section className="py-24 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance uppercase tracking-widest">
            Ce que vous ressentez.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acheter sa première propriété est angoissant. C'est normal. Ne laissez pas la peur dicter vos décisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-8 relative overflow-hidden group hover:border-crimson/50 transition-colors"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson shadow-crimson group-hover:w-1.5 transition-all" />
              <card.icon className="w-10 h-10 text-crimson mb-6" />
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
