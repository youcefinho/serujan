import { useState } from "react";
import { Award, Phone, Globe, MapPin, Star, X } from "lucide-react";
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

type TeamMember = (typeof clientConfig.teamMembers)[number];

export function ParentTeam() {
  const { t, ta } = useLanguage();
  const tr = translations.parentTeam;
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const closeMemberModal = () => setSelectedMember(null);

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
                    <button
                      key={member.name}
                      type="button"
                      onClick={() => setSelectedMember(i)}
                      className="group text-center cursor-pointer bg-transparent border-none p-0"
                      aria-label={`${t(tr.meetTeam)} — ${member.name}`}
                    >
                      {photo ? (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-crimson/40 group-hover:border-crimson group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-crimson/30">
                          <img
                            src={photo}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-crimson/30 to-crimson/10 border-2 border-crimson/40 flex items-center justify-center group-hover:border-crimson group-hover:scale-110 transition-all duration-300">
                          <span className="text-2xl font-black text-crimson/80">{member.initials}</span>
                        </div>
                      )}
                      <h5 className="text-sm font-bold leading-tight group-hover:text-crimson transition">{member.name}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{t(member.role)}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal membre sélectionné */}
      {selectedMember !== null && (
        <MemberModal
          member={clientConfig.teamMembers[selectedMember]}
          photo={memberPhotos[selectedMember]}
          onClose={closeMemberModal}
        />
      )}
    </section>
  );
}

function MemberModal({
  member,
  photo,
  onClose,
}: {
  member: TeamMember;
  photo: string | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
    >
      {/* Fond assombri */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />

      {/* Carte modale */}
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-navy/80 border border-border hover:bg-crimson hover:border-crimson transition"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Photo agrandie */}
        <div className="relative aspect-[4/5] bg-navy-deep">
          {photo ? (
            <img
              src={photo}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-black text-crimson/40">{member.initials}</span>
            </div>
          )}
          {/* Dégradé en bas de la photo */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Informations */}
        <div className="p-6 -mt-8 relative">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-sm text-crimson font-semibold mt-1">{t(member.role)}</p>

          {/* Étoiles + avis */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-bold">{member.stars}</span>
            <span className="text-xs text-muted-foreground">({member.reviews} avis)</span>
          </div>

          {/* Détails */}
          <div className="mt-5 space-y-3">
            <a
              href={`tel:${member.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-sm hover:text-crimson transition"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-crimson" />
              </div>
              <span>{member.phone}</span>
            </a>

            <a
              href={`https://${member.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm hover:text-crimson transition"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-crimson" />
              </div>
              <span>{member.website}</span>
            </a>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-crimson" />
              </div>
              <span>{member.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
