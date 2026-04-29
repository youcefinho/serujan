import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Search, Phone, Mail, X, Briefcase, DollarSign, Download } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_type: string | null;
  estimated_amount: string | null;
  message: string | null;
  created_at: string;
}

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeadsPage,
});

function exportCSV(leads: Lead[]) {
  if (leads.length === 0) return;

  const headers = ["Date", "Nom", "Téléphone", "Courriel", "Type de projet", "Montant estimé", "Message"];
  const escape = (v: string | null) => {
    if (!v) return "";
    const s = v.replace(/"/g, '""');
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
  };

  const rows = leads.map((l) => [
    new Date(l.created_at).toLocaleString("fr-CA"),
    escape(l.name),
    escape(l.phone),
    escape(l.email),
    escape(l.project_type),
    escape(l.estimated_amount),
    escape(l.message),
  ].join(","));

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("intralys-admin-token");
        if (!token) {
          localStorage.removeItem("intralys-admin-token");
          window.location.href = "/admin/login";
          return;
        }

        const response = await fetch("/api/admin/leads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("intralys-admin-token");
          window.location.href = "/admin/login";
          return;
        }

        if (!response.ok) throw new Error(`Erreur serveur (${response.status})`);

        const { data } = await response.json() as { data: Lead[] };
        setLeads(data ?? []);
      } catch (err) {
        console.error("Erreur chargement leads:", err);
        setError(err instanceof Error ? err.message : "Erreur de connexion au serveur");
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (search) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          (l.project_type?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [leads, search]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: leads.length,
      week: leads.filter((l) => new Date(l.created_at).getTime() > weekAgo).length,
      withProject: leads.filter((l) => l.project_type && l.project_type.length > 0).length,
      withAmount: leads.filter((l) => l.estimated_amount && l.estimated_amount.length > 0).length,
    };
  }, [leads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-gold text-lg font-bold">Erreur</div>
        <p className="text-sm text-muted-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gold text-primary-foreground rounded-md text-sm font-bold hover:bg-gold/90 transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leads commerciaux</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Toutes les demandes reçues via le formulaire
          </p>
        </div>
        <button
          onClick={() => exportCSV(leads)}
          disabled={leads.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-md text-sm font-semibold hover:border-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Exporter les leads en CSV"
        >
          <Download className="w-4 h-4" />
          Exporter CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Cette semaine" value={stats.week} accent />
        <StatCard label="Type projet" value={stats.withProject} icon={<Briefcase className="w-4 h-4" />} />
        <StatCard label="Montant estimé" value={stats.withAmount} icon={<DollarSign className="w-4 h-4" />} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, téléphone, type de projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md focus:border-gold focus:outline-none transition text-sm"
            aria-label="Rechercher dans les leads"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Aucun lead {search && `pour "${search}"`}.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-black-surface text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Nom</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Contact</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Projet</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Montant</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSelected(l)}
                    className="border-t border-border cursor-pointer hover:bg-black-surface/50 transition"
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(l.created_at).toLocaleDateString("fr-CA", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 font-semibold">{l.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                      <div>{l.email}</div>
                      <div>{l.phone}</div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                      {l.project_type ? (
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/30">
                          {l.project_type}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                      {l.estimated_amount || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && <LeadDetailModal lead={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: number;
  accent?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "bg-gradient-gold border-transparent text-primary-foreground"
          : "bg-card border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest opacity-80">{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

function LeadDetailModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Lead commercial
            </span>
            <h2 className="text-xl font-bold">{lead.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <Field label="Date">
            {new Date(lead.created_at).toLocaleString("fr-CA", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </Field>
          {lead.phone && (
            <Field label="Téléphone">
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center gap-2 text-gold hover:underline font-semibold"
              >
                <Phone className="w-4 h-4" />
                {lead.phone}
              </a>
            </Field>
          )}
          <Field label="Courriel">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-2 text-gold hover:underline font-semibold break-all"
            >
              <Mail className="w-4 h-4" />
              {lead.email}
            </a>
          </Field>
          <Field label="Type de projet">{lead.project_type || "—"}</Field>
          <Field label="Montant estimé">{lead.estimated_amount || "—"}</Field>
          {lead.message && (
            <Field label="Message">
              <div className="whitespace-pre-wrap text-foreground/90">{lead.message}</div>
            </Field>
          )}

          <div className="flex gap-2 pt-4 border-t border-border">
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-gradient-gold text-primary-foreground rounded-md font-bold text-sm"
              >
                <Phone className="w-4 h-4" />
                Appeler
              </a>
            )}
            <a
              href={`mailto:${lead.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-border text-foreground rounded-md font-bold text-sm hover:border-gold"
            >
              <Mail className="w-4 h-4" />
              Courriel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
        {label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
