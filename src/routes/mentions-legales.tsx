import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegalesPage,
  head: () => ({
    meta: [{ title: "Mentions légales — Serujan Kaneshalingam" }],
  }),
});

function MentionsLegalesPage() {
  const { t, ta } = useLanguage();
  const sections = ta(translations.legal.mentions.sections) as Array<{
    heading: string;
    body: string;
  }>;

  return (
    <LegalPage
      eyebrow={t(translations.legal.mentions.eyebrow)}
      title={t(translations.legal.mentions.title)}
      sections={sections}
    />
  );
}
