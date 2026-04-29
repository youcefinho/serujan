import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

// Login admin simplifié — mot de passe unique via API Cloudflare

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

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

      const data = await response.json() as { token?: string; error?: string };

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
    } catch (err) {
      console.error("Login error:", err);
      setError("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-elevate">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-crimson/20 to-crimson/5 border border-gold/30 flex items-center justify-center">
            <Lock className="w-6 h-6 text-gold" />
          </div>
          <h1 className="text-xl font-bold">Accès Administrateur</h1>
          <p className="text-sm text-muted-foreground mt-2">Entrez le mot de passe admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-md focus:border-gold focus:outline-none transition"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-gold text-primary-foreground font-bold uppercase tracking-widest rounded-md shadow-gold hover:scale-[1.01] transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
      <a href="/" className="block text-center text-xs text-muted-foreground hover:text-gold transition mt-6">
        ← Retour au site
      </a>
    </div>
  );
}
