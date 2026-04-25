import { useState } from "react";
import { Download, Book, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function LeadMagnet() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("/.netlify/functions/send-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: formData.get("prenom"),
          email: formData.get("email")
        }),
      });

      if (response.ok) {
        toast.success("Succès ! L'email contenant votre guide a été envoyé.", {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        });
        
        // Ouvrir le guide dans un nouvel onglet
        const link = document.createElement("a");
        link.href = "https://drive.google.com/file/d/1dzYfbnMTxe5sO9C78E_PaTx-9bblW0C3/view?usp=drive_link";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        form.reset();
      } else {
        throw new Error("Erreur réseau");
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-navy-deep border border-crimson/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-crimson">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">

            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-crimson/10 mb-6">
                <Book className="w-6 h-6 text-crimson" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Guide Gratuit du Premier Acheteur à Gatineau
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Les 5 erreurs les plus courantes, le vrai coût d'achat, et le processus étape par étape — offert gratuitement.
              </p>
            </div>

            <div className="md:w-1/2 w-full">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-navy p-6 rounded-2xl border border-border shadow-elevate"
              >
                <div>
                  <label htmlFor="magnet-name" className="block text-sm font-semibold mb-1.5">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="magnet-name"
                    name="prenom"
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="magnet-email" className="block text-sm font-semibold mb-1.5">
                    Courriel
                  </label>
                  <input
                    type="email"
                    id="magnet-email"
                    name="email"
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                    placeholder="votre@courriel.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-crimson text-primary-foreground font-bold rounded-lg shadow-crimson hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Recevoir le guide gratuitement
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
