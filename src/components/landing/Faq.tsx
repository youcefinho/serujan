import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function Faq() {
  const { t, ta } = useLanguage();
  const faqs = ta(translations.faqItems) as { q: string; a: string }[];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-navy-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(translations.faq.label)}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(translations.faq.title)}</h2>
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
