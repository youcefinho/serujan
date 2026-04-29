import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { LegalPage } from "@/components/landing/LegalPage";
import { RouteMeta } from "@/components/RouteMeta";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegalesPage,
  head: () => ({
    meta: [{ title: "Mentions légales — Serujan Kaneshalingam" }],
  }),
});

function MentionsLegalesPage() {
  const { t, ta, lang } = useLanguage();
  const sections = ta(translations.legal.mentions.sections) as Array<{
    heading: string;
    body: string;
  }>;

  return (
    <>
      <RouteMeta
        title={
          lang === "en"
            ? "Legal notice | Serujan Kaneshalingam"
            : "Mentions légales | Serujan Kaneshalingam"
        }
        description={
          lang === "en"
            ? "Legal notice for the website of Serujan Kaneshalingam, commercial mortgage broker in Montreal, Quebec."
            : "Mentions légales du site web de Serujan Kaneshalingam, courtier hypothécaire commercial à Montréal, Québec."
        }
      />
      <LegalPage
        eyebrow={t(translations.legal.mentions.eyebrow)}
        title={t(translations.legal.mentions.title)}
        sections={sections}
      />
    </>
  );
}
