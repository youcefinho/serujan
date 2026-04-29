import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/confidentialite")({
  component: ConfidentialitePage,
  head: () => ({
    meta: [{ title: "Confidentialité — Serujan Kaneshalingam" }],
  }),
});

function ConfidentialitePage() {
  const { t, ta } = useLanguage();
  const sections = ta(translations.legal.privacy.sections) as Array<{ heading: string; body: string }>;

  return (
    <LegalPage
      eyebrow={t(translations.legal.privacy.eyebrow)}
      title={t(translations.legal.privacy.title)}
      sections={sections}
    />
  );
}
