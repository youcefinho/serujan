import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, Mail, MessageCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/merci")({
  component: MerciPage,
});

function MerciPage() {
  return (
    <main className="min-h-screen bg-navy text-foreground flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-crimson mb-8 shadow-crimson">
          <CheckCircle2 className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
        </div>

        <span className="text-crimson text-sm font-bold uppercase tracking-widest">
          Demande reçue
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
          Merci pour votre confiance.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Votre demande a bien été enregistrée.{" "}
          <span className="text-foreground font-semibold">
            Mathis vous rappellera personnellement dans les 2 prochaines heures
          </span>{" "}
          (heures d'ouverture) pour discuter de votre projet immobilier.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <a
            href="tel:8199183409"
            className="flex flex-col items-center gap-2 p-5 bg-card border border-border rounded-xl hover:border-crimson transition"
          >
            <Phone className="w-6 h-6 text-crimson" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Appeler
            </span>
            <span className="text-sm font-bold">819-918-3409</span>
          </a>
          <a
            href="mailto:info@mathisguimont.com"
            className="flex flex-col items-center gap-2 p-5 bg-card border border-border rounded-xl hover:border-crimson transition"
          >
            <Mail className="w-6 h-6 text-crimson" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Courriel
            </span>
            <span className="text-sm font-bold break-all">info@mathisguimont.com</span>
          </a>
          <a
            href="https://wa.me/18199183409"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-5 bg-card border border-border rounded-xl hover:border-emerald-500 transition"
          >
            <MessageCircle className="w-6 h-6 text-emerald-500" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              WhatsApp
            </span>
            <span className="text-sm font-bold">Message instantané</span>
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            En attendant, suivez Mathis sur Instagram pour des conseils immobiliers
          </p>
          <a
            href="https://instagram.com/mathis_guimont"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-crimson hover:underline font-semibold"
          >
            @mathis_guimont
          </a>
        </div>

        <Link
          to="/"
          className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
