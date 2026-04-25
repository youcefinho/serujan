import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Travaillez-vous avec les premiers acheteurs ?",
    a: "Oui — c'est même ma spécialité. J'accompagne les premiers acheteurs à Gatineau à chaque étape : pré-approbation hypothécaire, recherche, visites, négociation, inspection et signature. Mon objectif : vous offrir la transaction sans stress, sans mauvaise surprise.",
  },
  {
    q: "Travaillez-vous avec les investisseurs immobiliers ?",
    a: "Absolument. J'aide les investisseurs à identifier des propriétés rentables dans l'Outaouais — analyse de cashflow, potentiel locatif, plex et unifamiliales. Que ce soit votre premier investissement ou votre dixième, on bâtit une stratégie alignée sur vos objectifs de patrimoine.",
  },
  {
    q: "Vendez-vous des condos à Gatineau ?",
    a: "Oui, je vends et j'aide à acheter des condos partout en Outaouais. Je connais bien les particularités du marché des copropriétés : fonds de prévoyance, déclaration de copropriété, frais de condo — on examine tout ensemble avant de signer.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-navy-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">Questions fréquentes</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-crimson transition"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
