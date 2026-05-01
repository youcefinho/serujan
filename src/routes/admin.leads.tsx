import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Loader2,
  Search,
  Phone,
  Mail,
  X,
  Briefcase,
  DollarSign,
  Download,
  Calendar,
  Inbox,
  TrendingUp,
  Globe,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_type: string | null;
  estimated_amount: string | null;
  message: string | null;
  created_at: string;
  // Attribution (migration 004)
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  language?: string | null;
  tags?: string | null;
  // GHL sync — champs renvoyés par l'API mais non affichés dans le dashboard client.
  // Cf. règle "client jamais d'erreur" — la sync technique reste interne agence.
  synced_to_ghl_at?: string | null;
  ghl_status?: string | null;
  ghl_response?: string | null;
}

const SOURCE_LABELS: Record<string, string> = {
  leadform: "Formulaire",
  midpage_cta: "Mid-page",
  exit_intent: "Exit-intent",
  calculator: "Calculator",
};

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeadsPage,
});

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function exportCSV(leads: Lead[]) {
  if (leads.length === 0) return;
  const headers = [
    "Date",
    "Nom",
    "Téléphone",
    "Courriel",
    "Type de projet",
    "Montant estimé",
    "Message",
    "Source",
    "UTM source",
    "UTM medium",
    "UTM campaign",
    "Référent",
    "Langue",
    "Tags",
  ];
  const escape = (v: string | null | undefined) => {
    if (!v) return "";
    const s = v.replace(/"/g, '""');
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
  };

  const rows = leads.map((l) =>
    [
      new Date(l.created_at).toLocaleString("fr-CA"),
      escape(l.name),
      escape(l.phone),
      escape(l.email),
      escape(l.project_type),
      escape(l.estimated_amount),
      escape(l.message),
      escape(l.source),
      escape(l.utm_source),
      escape(l.utm_medium),
      escape(l.utm_campaign),
      escape(l.referrer),
      escape(l.language),
      escape(l.tags),
    ].join(","),
  );

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
  const [filterSource, setFilterSource] = useState<string>("all");
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

        const { data } = (await response.json()) as { data: Lead[] };
        setLeads(data ?? []);
      } catch (err) {
        // Erreur silencieuse — affichage utilisateur via setError, pas de log client
        setError(err instanceof Error ? err.message : "Erreur de connexion au serveur");
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filterSource !== "all" && (l.source ?? "") !== filterSource) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.project_type?.toLowerCase().includes(q) ?? false) ||
        (l.utm_source?.toLowerCase().includes(q) ?? false) ||
        (l.utm_campaign?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [leads, search, filterSource]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return {
      total: leads.length,
      week: leads.filter((l) => new Date(l.created_at).getTime() > weekAgo).length,
      month: leads.filter((l) => new Date(l.created_at).getTime() > monthAgo).length,
      withProject: leads.filter((l) => l.project_type && l.project_type.length > 0).length,
    };
  }, [leads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="font-display text-2xl text-gold">Erreur</div>
        <p className="text-sm text-foreground/55">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-gold text-black-deep rounded-md text-sm font-semibold hover:bg-gold-light transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-gold/50" aria-hidden />
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-light">
              Tableau de bord
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground">
            Leads commerciaux
          </h1>
          <p className="mt-2 text-sm text-foreground/55">
            Toutes les demandes reçues via le formulaire d'évaluation
          </p>
        </div>

        <button
          onClick={() => exportCSV(leads)}
          disabled={leads.length === 0}
          className="inline-flex items-center gap-2 px-5 py-3 bg-black-elevated/60 border border-gold/15 hover:border-gold/40 rounded-md text-sm font-medium text-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Exporter les leads en CSV"
        >
          <Download className="w-4 h-4 text-gold" />
          <span>Exporter CSV</span>
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total" value={stats.total} icon={<Inbox className="w-4 h-4" />} />
        <StatCard
          label="Cette semaine"
          value={stats.week}
          accent
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="30 derniers jours"
          value={stats.month}
          icon={<Calendar className="w-4 h-4" />}
        />
        <StatCard
          label="Avec type de projet"
          value={stats.withProject}
          icon={<Briefcase className="w-4 h-4" />}
        />
      </div>

      {/* Search + filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
          <input
            type="text"
            placeholder="Rechercher nom, email, téléphone, projet, UTM…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-black-elevated/40 border border-gold/15 rounded-md focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm placeholder-foreground/40"
            aria-label="Rechercher dans les leads"
          />
        </div>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="px-4 py-3 bg-black-elevated/40 border border-gold/15 rounded-md text-sm focus:border-gold/40 focus:outline-none cursor-pointer"
          aria-label="Filtrer par source"
        >
          <option value="all">Toutes sources</option>
          <option value="leadform">Formulaire</option>
          <option value="midpage_cta">Mid-page</option>
          <option value="exit_intent">Exit-intent</option>
          <option value="calculator">Calculator</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-black-elevated/40 border border-gold/15 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Inbox className="w-10 h-10 text-gold/30 mx-auto mb-4" strokeWidth={1.2} />
            <p className="text-foreground/50 text-sm">Aucun lead {search && `pour "${search}"`}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-black-deep/60 text-[10px] uppercase tracking-[0.2em] text-foreground/45 border-b border-gold/10">
                <tr>
                  <th className="px-5 py-4 text-left font-medium">Date</th>
                  <th className="px-5 py-4 text-left font-medium">Nom</th>
                  <th className="px-5 py-4 text-left font-medium hidden md:table-cell">Contact</th>
                  <th className="px-5 py-4 text-left font-medium hidden lg:table-cell">Source</th>
                  <th className="px-5 py-4 text-left font-medium hidden xl:table-cell">UTM</th>
                  <th className="px-5 py-4 text-left font-medium hidden lg:table-cell">Projet</th>
                  <th className="px-5 py-4 text-left font-medium hidden xl:table-cell">Montant</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSelected(l)}
                    className="border-t border-gold/5 cursor-pointer hover:bg-gold/[0.03] transition-colors"
                  >
                    <td className="px-5 py-4 text-xs text-foreground/55 whitespace-nowrap tabular-nums">
                      {new Date(l.created_at).toLocaleDateString("fr-CA", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-4 font-display tracking-tight text-foreground">
                      {l.name}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-foreground/55 text-xs">
                      <div>{l.email}</div>
                      <div className="tabular-nums font-mono">{l.phone}</div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {l.source ? (
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-emerald-400/10 text-emerald-300 border border-emerald-400/25">
                          {SOURCE_LABELS[l.source] ?? l.source}
                        </span>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell text-foreground/55 text-[11px]">
                      {l.utm_source ? (
                        <span className="font-mono">
                          {l.utm_source}
                          {l.utm_medium ? ` · ${l.utm_medium}` : ""}
                        </span>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {l.project_type ? (
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
                          {l.project_type}
                        </span>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell text-foreground/65 text-xs">
                      {l.estimated_amount || <span className="text-foreground/30">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal détail */}
      <AnimatePresence>
        {selected && <LeadDetailModal lead={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className={`relative rounded-xl border p-5 ${
        accent
          ? "bg-gradient-gold border-transparent text-black-deep"
          : "bg-black-elevated/50 border-gold/15"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] uppercase tracking-[0.22em] ${accent ? "text-black-deep/70" : "text-foreground/45"}`}
        >
          {label}
        </span>
        <span className={accent ? "text-black-deep/70" : "text-gold/60"}>{icon}</span>
      </div>
      <div
        className={`font-display text-3xl md:text-4xl tabular-nums leading-none ${accent ? "text-black-deep" : "text-foreground"}`}
      >
        {value}
      </div>
    </motion.div>
  );
}

function LeadDetailModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black-deep/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black-elevated border border-gold/20 rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-elevate"
      >
        <div className="sticky top-0 bg-black-elevated border-b border-gold/15 px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold-light/70">
              Lead commercial
            </span>
            <h2 className="font-display text-2xl text-foreground tracking-tight mt-0.5">
              {lead.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-gold/15 flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/40 transition-all"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
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
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" />
                {lead.phone}
              </a>
            </Field>
          )}
          <Field label="Courriel">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium break-all"
            >
              <Mail className="w-3.5 h-3.5" />
              {lead.email}
            </a>
          </Field>
          <Field label="Type de projet">
            {lead.project_type || <span className="text-foreground/30">—</span>}
          </Field>
          <Field label="Montant estimé" icon={<DollarSign className="w-3 h-3 text-gold/60" />}>
            {lead.estimated_amount || <span className="text-foreground/30">—</span>}
          </Field>
          {lead.message && (
            <Field label="Message">
              <div className="whitespace-pre-wrap text-foreground/85 leading-relaxed">
                {lead.message}
              </div>
            </Field>
          )}

          {/* Section attribution */}
          {(lead.source ||
            lead.utm_source ||
            lead.utm_medium ||
            lead.utm_campaign ||
            lead.referrer ||
            lead.language ||
            lead.tags) && (
            <div className="pt-5 border-t border-gold/10 space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-gold-light/70 font-medium">
                <Globe className="w-3 h-3" />
                <span>Attribution</span>
              </div>
              {lead.source && (
                <Field label="Source du tunnel">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-emerald-400/10 text-emerald-300 border border-emerald-400/25">
                    {SOURCE_LABELS[lead.source] ?? lead.source}
                  </span>
                </Field>
              )}
              {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                <Field label="UTM">
                  <div className="font-mono text-xs text-foreground/85 space-y-0.5">
                    {lead.utm_source && (
                      <div>
                        <span className="text-foreground/45">source · </span>
                        {lead.utm_source}
                      </div>
                    )}
                    {lead.utm_medium && (
                      <div>
                        <span className="text-foreground/45">medium · </span>
                        {lead.utm_medium}
                      </div>
                    )}
                    {lead.utm_campaign && (
                      <div>
                        <span className="text-foreground/45">campaign · </span>
                        {lead.utm_campaign}
                      </div>
                    )}
                    {lead.utm_term && (
                      <div>
                        <span className="text-foreground/45">term · </span>
                        {lead.utm_term}
                      </div>
                    )}
                    {lead.utm_content && (
                      <div>
                        <span className="text-foreground/45">content · </span>
                        {lead.utm_content}
                      </div>
                    )}
                  </div>
                </Field>
              )}
              {lead.referrer && (
                <Field label="Référent">
                  <a
                    href={lead.referrer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground/70 break-all hover:text-gold transition-colors"
                  >
                    {lead.referrer}
                  </a>
                </Field>
              )}
              {lead.language && (
                <Field label="Langue navigateur">
                  <span className="font-mono text-xs">{lead.language}</span>
                </Field>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-5 border-t border-gold/10">
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-gradient-gold text-black-deep rounded-md font-semibold text-sm shadow-gold-sm hover:shadow-gold transition-all"
              >
                <Phone className="w-4 h-4" />
                Appeler
              </a>
            )}
            <a
              href={`mailto:${lead.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-gold/30 text-foreground rounded-md font-semibold text-sm hover:border-gold hover:bg-gold/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              Courriel
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground/45 font-medium mb-1.5">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
