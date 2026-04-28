import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const baseSchema = {
  name: z.string().trim().min(2, "Nom requis (min. 2 caractères)").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Numéro de téléphone invalide")
    .max(20)
    .regex(/^[0-9+()\-.\s]+$/, "Numéro de téléphone invalide"),
  email: z.string().trim().email("Courriel invalide").max(255),
  message: z.string().trim().max(1000).optional(),
};

const buySchema = z.object({
  ...baseSchema,
  budget: z.string().min(1).max(100),
  timeline: z.string().min(1).max(100),
});

const sellSchema = z.object({
  ...baseSchema,
  address: z.string().trim().min(3, "Adresse requise").max(200),
  property_type: z.string().min(1).max(100),
});

export function LeadForm() {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries());

    // Honeypot anti-spam: if a bot filled the hidden field, silently fake a success
    if (raw.website) {
      form.reset();
      navigate({ to: "/merci" });
      return;
    }

    try {
      setLoading(true);

      const parsed = tab === "buy" ? buySchema.parse(raw) : sellSchema.parse(raw);

      const { error } = await supabase.from("leads").insert({
        type: tab,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
        message: parsed.message || null,
        budget: tab === "buy" ? (parsed as z.infer<typeof buySchema>).budget : null,
        timeline: tab === "buy" ? (parsed as z.infer<typeof buySchema>).timeline : null,
        address: tab === "sell" ? (parsed as z.infer<typeof sellSchema>).address : null,
        property_type:
          tab === "sell" ? (parsed as z.infer<typeof sellSchema>).property_type : null,
      });

      if (error) throw error;

      form.reset();
      navigate({ to: "/merci" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0]?.message ?? "Veuillez vérifier les champs.");
      } else {
        console.error("Lead submission failed:", err);
        toast.error("Une erreur est survenue. Veuillez réessayer ou appeler 819-918-3409.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">Contact</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">Démarrons votre projet.</h2>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevate" suppressHydrationWarning>
          {!mounted ? (
            <div className="p-6 sm:p-10 lg:p-16 min-h-[600px] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-crimson" />
            </div>
          ) : (
          <>
          <div className="grid grid-cols-2">
            {(["buy", "sell"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`py-5 font-bold uppercase tracking-widest text-sm transition relative ${
                  tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={t === "buy" ? "Formulaire acheteur" : "Formulaire vendeur"}
              >
                {t === "buy" ? "J'achète" : "Je vends"}
                {tab === t && <span className="absolute bottom-0 left-0 right-0 h-1 bg-crimson" />}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-10 space-y-5" noValidate>
            {/* Honeypot — invisible to humans, filled by bots */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="website">Ne pas remplir</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="name" label="Nom complet" required maxLength={100} autoComplete="name" />
              <Input
                name="phone"
                label="Téléphone"
                type="tel"
                required
                maxLength={20}
                autoComplete="tel"
              />
            </div>
            <Input
              name="email"
              label="Courriel"
              type="email"
              required
              maxLength={255}
              autoComplete="email"
            />

            {tab === "buy" ? (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    name="budget"
                    label="Budget"
                    options={[
                      "Moins de 300 000 $",
                      "300 000 – 500 000 $",
                      "500 000 – 750 000 $",
                      "750 000 $ et plus",
                    ]}
                  />
                  <Select
                    name="timeline"
                    label="Échéancier"
                    options={["0–3 mois", "3–6 mois", "6–12 mois", "Je m'informe"]}
                  />
                </div>
                <Textarea name="message" label="Quel type de propriété cherchez-vous ?" />
              </>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="address"
                    label="Adresse de la propriété"
                    required
                    maxLength={200}
                    autoComplete="street-address"
                  />
                  <Select
                    name="property_type"
                    label="Type de propriété"
                    options={["Maison unifamiliale", "Condo", "Plex", "Terrain", "Autre"]}
                  />
                </div>
                <Textarea name="message" label="Parlez-nous de votre propriété" />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-crimson text-primary-foreground font-bold uppercase tracking-widest rounded-md shadow-crimson hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Réponse personnelle de Mathis en moins de 2h. Vos informations restent confidentielles.
            </p>
          </form>
          </>
          )}
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  maxLength,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 bg-input border border-border rounded-md focus:border-crimson focus:outline-none transition"
      />
    </div>
  );
}

function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <textarea
        name={name}
        rows={4}
        maxLength={1000}
        className="w-full px-4 py-3 bg-input border border-border rounded-md focus:border-crimson focus:outline-none transition resize-none"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <select
        name={name}
        suppressHydrationWarning
        className="w-full px-4 py-3 bg-input border border-border rounded-md focus:border-crimson focus:outline-none transition"
      >
        {options.map((o) => (
          <option key={o} className="bg-card">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
