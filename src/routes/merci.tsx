import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, Mail, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { clientConfig } from "@/lib/config";

export const Route = createFileRoute("/merci")({
  component: MerciPage,
});

const tr = {
  badge: { fr: "Demande reçue", en: "Request received" },
  title: { fr: "Merci pour votre confiance.", en: "Thank you for your trust." },
  description: {
    fr: "Votre demande a bien été enregistrée.",
    en: "Your request has been successfully recorded.",
  },
  callbackBold: {
    fr: `${clientConfig.name} vous contactera personnellement ${clientConfig.merci.callbackDelay.fr}`,
    en: `${clientConfig.name} will personally contact you ${clientConfig.merci.callbackDelay.en}`,
  },
  callbackEnd: {
    fr: "(heures d'ouverture) pour discuter de votre projet.",
    en: "(business hours) to discuss your project.",
  },
  call: { fr: "Appeler", en: "Call" },
  email: { fr: "Courriel", en: "Email" },
  followText: {
    fr: `En attendant, suivez ${clientConfig.name} sur Instagram pour des insights exclusifs`,
    en: `In the meantime, follow ${clientConfig.name} on Instagram for exclusive insights`,
  },
  back: { fr: "Retour à l'accueil", en: "Back to home" },
};

function MerciPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold mb-8 shadow-gold">
          <CheckCircle2 className="w-10 h-10 text-black-deep" strokeWidth={2.5} />
        </div>

        <span className="text-gold text-sm font-bold uppercase tracking-widest">
          {t(tr.badge)}
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
          {t(tr.title)}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          {t(tr.description)}{" "}
          <span className="text-foreground font-semibold">
            {t(tr.callbackBold)}
          </span>{" "}
          {t(tr.callbackEnd)}
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <a
            href={`tel:${clientConfig.phone.raw}`}
            className="flex flex-col items-center gap-2 p-5 bg-card border border-border rounded-xl hover:border-gold transition"
          >
            <Phone className="w-6 h-6 text-gold" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {t(tr.call)}
            </span>
            <span className="text-sm font-bold">{clientConfig.phone.display}</span>
          </a>
          <a
            href={`mailto:${clientConfig.email}`}
            className="flex flex-col items-center gap-2 p-5 bg-card border border-border rounded-xl hover:border-gold transition"
          >
            <Mail className="w-6 h-6 text-gold" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {t(tr.email)}
            </span>
            <span className="text-sm font-bold break-all">{clientConfig.email}</span>
          </a>
        </div>

        {clientConfig.socials.instagram && (
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              {t(tr.followText)}
            </p>
            <a
              href={clientConfig.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:underline font-semibold"
            >
              {clientConfig.socials.instagram.handle}
            </a>
          </div>
        )}

        <Link
          to="/"
          className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t(tr.back)}
        </Link>
      </div>
    </main>
  );
}
