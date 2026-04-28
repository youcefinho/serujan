import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard } from "lucide-react";
import { clientConfig } from "@/lib/config";

// Admin simplifié — Authentification par token localStorage
// Le token est obtenu via POST /api/admin/login (mot de passe unique)

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("intralys-admin-token");
    setAuthed(!!token);
    setChecking(false);
  }, []);

  const handleSignOut = async () => {
    // Invalider le token côté serveur
    const token = localStorage.getItem("intralys-admin-token");
    if (token) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // Continuer la déconnexion même si l'API échoue
      }
    }
    localStorage.removeItem("intralys-admin-token");
    window.location.href = "/admin/login";
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-foreground">
        <div className="text-sm text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  // Non connecté → afficher le login
  if (!authed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-foreground">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-foreground">
      <header className="border-b border-border bg-navy-deep">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin/leads" className="flex items-center gap-2 font-bold">
            <LayoutDashboard className="w-5 h-5 text-crimson" />
            Admin · {clientConfig.name}
          </Link>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
