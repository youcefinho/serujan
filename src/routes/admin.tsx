import { createFileRoute, Outlet, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        setAuthed(false);
        setChecking(false);
        return;
      }

      setAuthed(true);
      setEmail(session.user.email ?? null);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (!mounted) return;

      const adminFound = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(adminFound);
      setChecking(false);
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthed(false);
        setIsAdmin(false);
        setEmail(null);
      } else {
        check();
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-foreground">
        <div className="text-sm text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  // Not logged in → redirect to login (but allow /admin/login itself)
  if (!authed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-foreground">
        <Outlet />
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-foreground px-6">
        <div className="max-w-md text-center bg-card border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold">Accès refusé</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Votre compte ({email}) n'a pas les permissions d'administrateur.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Contactez le développeur pour obtenir l'accès.
          </p>
          <button
            onClick={handleSignOut}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-crimson text-primary-foreground rounded-md font-semibold text-sm"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-foreground">
      <header className="border-b border-border bg-navy-deep">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin/leads" className="flex items-center gap-2 font-bold">
            <LayoutDashboard className="w-5 h-5 text-crimson" />
            Admin · Mathis Guimont
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-muted-foreground">{email}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
