import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackLeadFormSubmit } from "@/lib/analytics";
import { clientConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function LeadForm() {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { t, ta } = useLanguage();
  const tr = translations.leadForm;
  const fields = translations.leadFormFields;

  // Schémas de validation dynamiques (utilisant les traductions courantes)
  const baseSchema = {
    name: z.string().trim().min(2, t(fields.nameRequired)).max(100),
    phone: z
      .string()
      .trim()
      .min(7, t(fields.phoneInvalid))
      .max(20)
      .regex(/^[0-9+()\-.s]+$/, t(fields.phoneInvalid)),
    email: z.string().trim().email(t(fields.emailInvalid)).max(255),
    message: z.string().trim().max(1000).optional(),
  };

  const buySchema = z.object({
    ...baseSchema,
    budget: z.string().min(1).max(100),
    timeline: z.string().min(1).max(100),
  });

  const sellSchema = z.object({
    ...baseSchema,
    address: z.string().trim().min(3, t(fields.addressRequired)).max(200),
    property_type: z.string().min(1).max(100),
  });

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

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: tab,
          name: parsed.name,
          phone: parsed.phone,
          email: parsed.email,
          message: parsed.message || "",
          // Champs de qualification spécifiques au type
          budget: tab === "buy" && "budget" in parsed ? parsed.budget : "",
          timeline: tab === "buy" && "timeline" in parsed ? parsed.timeline : "",
          address: tab === "sell" && "address" in parsed ? parsed.address : "",
          property_type: tab === "sell" && "property_type" in parsed ? parsed.property_type : "",
        }),
      });

      if (!response.ok) throw new Error(t(fields.serverError));

      trackLeadFormSubmit(tab);
      form.reset();
      navigate({ to: "/merci" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0]?.message ?? t(fields.validationError));
      } else {
        console.error("Lead submission failed:", err);
        toast.error(`${t(fields.genericError)} ${clientConfig.phone.display}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Options traduits
  const budgetOptions = ta(fields.budgetOptions) as string[];
  const timelineOptions = ta(fields.timelineOptions) as string[];
  const propertyTypeOptions = ta(fields.propertyTypeOptions) as string[];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(tr.title)}</h2>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevate" suppressHydrationWarning>
          {!mounted ? (
            <div className="p-6 sm:p-10 lg:p-16 min-h-[600px] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-crimson" />
            </div>
          ) : (
          <>
          <div className="grid grid-cols-2">
            {(["buy", "sell"] as const).map((tabValue) => (
              <button
                key={tabValue}
                type="button"
                onClick={() => setTab(tabValue)}
                className={`py-5 font-bold uppercase tracking-widest text-sm transition relative ${
                  tab === tabValue ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={tabValue === "buy" ? t(fields.tabBuyLabel) : t(fields.tabSellLabel)}
              >
                {tabValue === "buy" ? t(fields.tabBuy) : t(fields.tabSell)}
                {tab === tabValue && <span className="absolute bottom-0 left-0 right-0 h-1 bg-crimson" />}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-10 space-y-5" noValidate>
            {/* Honeypot — invisible to humans, filled by bots */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="website">{t(fields.honeypot)}</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="name" label={t(fields.name)} required maxLength={100} autoComplete="name" />
              <Input
                name="phone"
                label={t(fields.phone)}
                type="tel"
                required
                maxLength={20}
                autoComplete="tel"
              />
            </div>
            <Input
              name="email"
              label={t(fields.email)}
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
                    label={t(fields.budget)}
                    options={budgetOptions}
                  />
                  <Select
                    name="timeline"
                    label={t(fields.timeline)}
                    options={timelineOptions}
                  />
                </div>
                <Textarea name="message" label={t(fields.messageBuy)} />
              </>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="address"
                    label={t(fields.address)}
                    required
                    maxLength={200}
                    autoComplete="street-address"
                  />
                  <Select
                    name="property_type"
                    label={t(fields.propertyType)}
                    options={propertyTypeOptions}
                  />
                </div>
                <Textarea name="message" label={t(fields.messageSell)} />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-crimson text-primary-foreground font-bold uppercase tracking-widest rounded-md shadow-crimson hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? t(tr.sending) : t(tr.submit)}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              {t(tr.trustBold)} {clientConfig.name} {t(tr.trustText)}
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
