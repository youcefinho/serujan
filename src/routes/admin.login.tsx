import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { clientConfig } from "@/lib/config";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !password) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as { token?: string; error?: string };

      if (response.status === 429) {
        setError("Trop de tentatives. Réessayez dans 1 heure.");
        return;
      }
      if (response.status === 401 || !data.token) {
        setError("Mot de passe incorrect");
        return;
      }
      if (!response.ok) {
        setError(data.error || "Erreur serveur");
        return;
      }

      localStorage.setItem("intralys-admin-token", data.token);
      window.location.href = "/admin/leads";
    } catch {
      // Erreur silencieuse côté client — message générique affiché à l'utilisateur
      setError("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black-deep flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative w-full max-w-md"
      >
        {/* Card login */}
        <div className="relative p-10 rounded-2xl bg-black-elevated/70 border border-gold/20 shadow-elevate backdrop-blur-sm">
          {/* Icône cadenas */}
          <div className="flex justify-center mb-6">
            <div className="relative w-14 h-14 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center">
              <Lock className="w-6 h-6 text-gold" strokeWidth={1.5} />
              <span
                className="absolute inset-0 rounded-xl border border-gold/30 animate-pulse-gold"
                aria-hidden
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-6 h-px bg-gold/50" aria-hidden />
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-light">
                Espace administrateur
              </span>
              <span className="w-6 h-px bg-gold/50" aria-hidden />
            </div>
            <h1 className="font-display text-2xl text-foreground tracking-tight">
              {clientConfig.shortName} · Admin
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-black-deep/60 border border-gold/15 text-foreground placeholder-foreground/30 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                required
                autoFocus
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive-foreground/90 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{loading ? "Connexion…" : "Se connecter"}</span>
            </button>
          </form>
        </div>

        {/* Retour site */}
        <a
          href="/"
          className="group mt-6 flex items-center justify-center gap-2 text-xs text-foreground/45 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Retour au site</span>
        </a>
      </motion.div>
    </main>
  );
}
