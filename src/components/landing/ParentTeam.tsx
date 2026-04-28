import { Award } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

// SWAP: Photos des membres de l'équipe
import xavierPhoto from "@/assets/xavier.jpg";
import aliPhoto from "@/assets/ali.jpg";
import fxPhoto from "@/assets/charbonneau.jpg";
import flPhoto from "@/assets/francois.jpg";

// Associer les photos aux membres dans l'ordre de config.teamMembers
const memberPhotos: (string | null)[] = [xavierPhoto, aliPhoto, fxPhoto, flPhoto];

export function ParentTeam() {
  const { t, ta } = useLanguage();
  const tr = translations.parentTeam;

  return (
    <section className="py-20 lg:py-28 bg-navy-deep border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
        <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">{t(tr.title)}</h2>
        
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-crimson/20 to-crimson/5 border border-crimson/30 flex items-center justify-center">
            <Award className="w-12 h-12 text-crimson" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-4">{t(tr.teamName)}</h3>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">{t(tr.description)}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-12">
            {(ta(tr.tags) as string[]).map((tag: string) => (
              <div key={tag} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson" />{tag}
              </div>
            ))}
          </div>

          {/* Membres de l'équipe */}
          {clientConfig.teamMembers.length > 0 && (
            <div className="border-t border-border pt-10">
              <h4 className="text-sm font-bold uppercase tracking-widest text-crimson mb-8">{t(tr.meetTeam)}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {clientConfig.teamMembers.map((member, i) => {
                  const photo = memberPhotos[i];
                  return (
                    <div key={member.name} className="group text-center">
                      {photo ? (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-crimson/40 group-hover:border-crimson group-hover:scale-105 transition-all duration-300">
                          <img
                            src={photo}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-crimson/30 to-crimson/10 border-2 border-crimson/40 flex items-center justify-center group-hover:border-crimson group-hover:scale-105 transition-all duration-300">
                          <span className="text-2xl font-black text-crimson/80">{member.initials}</span>
                        </div>
                      )}
                      <h5 className="text-sm font-bold leading-tight">{member.name}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{t(member.role)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
