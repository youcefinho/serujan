import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connecté !");
        navigate({ to: "/admin/leads" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/leads`,
          },
        });
        if (error) throw error;
        toast.success("Compte créé. Vérifiez votre courriel pour confirmer.");
        setMode("login");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-elevate">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-crimson mb-4">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Connexion admin" : "Créer un compte admin"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accès réservé à l'équipe Mathis Guimont
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Courriel
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-input border border-border rounded-md focus:border-crimson focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="w-full px-4 py-3 bg-input border border-border rounded-md focus:border-crimson focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-crimson text-primary-foreground font-bold uppercase tracking-widest rounded-md shadow-crimson hover:scale-[1.01] transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "login" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {mode === "login" ? (
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-muted-foreground hover:text-foreground transition"
            >
              Première fois ? <span className="text-crimson font-semibold">Créer un compte</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-muted-foreground hover:text-foreground transition"
            >
              Déjà un compte ? <span className="text-crimson font-semibold">Se connecter</span>
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
