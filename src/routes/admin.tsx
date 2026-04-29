import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard, ExternalLink } from "lucide-react";
import { clientConfig } from "@/lib/config";

// Layout admin avec design v2 noir/or
// Auth par token localStorage + invalidation server-side via /api/admin/logout

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
    const token = localStorage.getItem("intralys-admin-token");
    if (token) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // déconnexion client même si l'API échoue
      }
    }
    localStorage.removeItem("intralys-admin-token");
    window.location.href = "/admin/login";
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-black-deep flex items-center justify-center text-foreground">
        <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">Chargement…</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black-deep flex items-center justify-center text-foreground">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-deep text-foreground">
      <header className="sticky top-0 z-30 border-b border-gold/10 bg-black-deep/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin/leads" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
              <LayoutDashboard className="w-4 h-4 text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-sm tracking-tight leading-none">
                {clientConfig.shortName}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/45 mt-1">
                Admin
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-5">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-foreground/55 hover:text-gold transition-colors"
            >
              <span>Site public</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-foreground/70 hover:text-gold border border-gold/15 hover:border-gold/40 rounded-md transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
