import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { LegalPage } from "@/components/landing/LegalPage";
import { RouteMeta } from "@/components/RouteMeta";

export const Route = createFileRoute("/confidentialite")({
  component: ConfidentialitePage,
  head: () => ({
    meta: [{ title: "Confidentialité — Serujan Kaneshalingam" }],
  }),
});

function ConfidentialitePage() {
  const { t, ta, lang } = useLanguage();
  const sections = ta(translations.legal.privacy.sections) as Array<{
    heading: string;
    body: string;
  }>;

  return (
    <>
      <RouteMeta
        title={
          lang === "en"
            ? "Privacy policy | Serujan Kaneshalingam"
            : "Politique de confidentialité | Serujan Kaneshalingam"
        }
        description={
          lang === "en"
            ? "Privacy policy of Serujan Kaneshalingam — how we collect, use and protect your personal information under Quebec Law 25."
            : "Politique de confidentialité de Serujan Kaneshalingam — comment nous collectons, utilisons et protégeons vos informations personnelles selon la Loi 25 du Québec."
        }
      />
      <LegalPage
        eyebrow={t(translations.legal.privacy.eyebrow)}
        title={t(translations.legal.privacy.title)}
        sections={sections}
      />
    </>
  );
}
