import { Component, type ErrorInfo, type ReactNode } from "react";
import { clientConfig } from "@/lib/config";

// ═══════════════════════════════════════════════════════════
// ErrorBoundary — filet de sécurité React
//
// Si un composant crash en runtime (lazy load failed, render error,
// etc.), le user voit un fallback éditorial avec CTAs de contact direct
// au lieu d'un écran blanc. Respect règle "client jamais d'erreur"
// (SHARED_PLAN.md § 1).
//
// Logge l'erreur dans console pour debug (et idéalement Sentry plus tard).
// ═══════════════════════════════════════════════════════════

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log côté console pour debug (Sentry à brancher plus tard)
    // PII redaction : on ne logge que name + stack, pas le contexte user
    console.error("[ErrorBoundary]", error.name, error.message);
    if (errorInfo.componentStack) {
      console.error("[ErrorBoundary] Stack:", errorInfo.componentStack.slice(0, 500));
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-black-deep px-6 py-20">
          {/* Halo signature */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-50"
            style={{
              background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.08) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
            aria-hidden
          />

          <div className="relative max-w-lg text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold/50" aria-hidden />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
                Pause technique
              </span>
              <span className="w-8 h-px bg-gold/50" aria-hidden />
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight mb-5 text-balance">
              Un instant —{" "}
              <span className="text-gold-gradient italic font-display-italic">
                quelque chose s'est mal chargé.
              </span>
            </h1>

            <p className="text-foreground/65 leading-relaxed mb-8 text-pretty">
              Pour ne pas perdre de temps, contactez {clientConfig.shortName} directement :
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href={`tel:+${clientConfig.phone.international}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gradient-gold text-black-deep font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm hover:shadow-gold btn-shine"
              >
                {clientConfig.phone.display}
              </a>
              <a
                href={`mailto:${clientConfig.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gold/30 text-foreground font-medium text-sm hover:border-gold/60 transition-all"
              >
                {clientConfig.email}
              </a>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-xs text-foreground/45 hover:text-foreground/70 transition-colors underline underline-offset-2"
            >
              Recharger la page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
