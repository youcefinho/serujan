# Améliorations finales — landing Mathis Guimont

Ajout de 5 améliorations sans toucher au design existant. Aucune notification email (à configurer plus tard si désiré).

## 1. Section Témoignages + Ventes récentes

Nouveau composant `src/components/landing/Testimonials.tsx`, inséré entre `Manifesto` et `Process` dans `src/routes/index.tsx`.

**Contenu :**
- 5 témoignages (Sarah & Marc, Karine, David, Émilie, Patrick & Julie) avec nom, quartier, étoiles 5/5, citation, initiales en avatar dégradé crimson
- Bandeau « Vendu récemment » : 4 cartes (Hull condo · Aylmer maison · Gatineau plex · Buckingham bungalow) avec quartier, type, prix, délai de vente, badge « Vendu »

**Note :** témoignages et ventes sont du contenu d'exemple réaliste — Mathis pourra les remplacer par les vrais.

## 2. Bouton WhatsApp flottant

Nouveau composant `src/components/landing/WhatsAppButton.tsx`, monté globalement dans `src/routes/index.tsx`.

- Position fixe bottom-right, z-50
- Cercle vert (emerald-500) 56px avec icône MessageCircle blanche
- Animation `ping` autour pour attirer l'œil
- Tooltip « Écrivez-moi sur WhatsApp » au hover (desktop)
- Lien `https://wa.me/18199183409` avec message pré-rempli en français
- Mobile-friendly (visible en permanence sur mobile)

## 3. Page /merci après soumission

Nouvelle route `src/routes/merci.tsx` (TanStack file-based) avec meta `noindex, nofollow`.

**Contenu :**
- Icône check verte, titre « Merci pour votre confiance. »
- Promesse « Mathis vous rappellera dans les 2 prochaines heures »
- 3 cartes de contact (Appeler, Courriel, WhatsApp)
- Lien Instagram @mathis_guimont
- Lien retour à l'accueil

**Modification de `LeadForm.tsx` :** après `supabase.from("leads").insert(...)` succès, `navigate({ to: "/merci" })` au lieu du toast (le toast reste comme fallback en cas d'erreur navigation).

## 4. Badge « Réponse en moins de 2h »

Modification du `Hero.tsx` : sous le bloc des 3 CTAs (`Prendre rendez-vous` / `Appeler maintenant` / `Envoyer un message`), ajout d'un petit badge horizontal :

- Icône horloge + texte « Réponse en moins de 2h · 7j/7 · Disponible Québec & Ontario »
- Style : `text-xs uppercase tracking-widest text-muted-foreground`, point vert pulsant à gauche

Mise à jour aussi du texte sous le formulaire de lead (LeadForm) : « Réponse garantie sous 24h » → « Réponse personnelle de Mathis en moins de 2h ».

## 5. SEO — Schema.org + sitemap + robots + Open Graph

### `src/routes/__root.tsx`
- Mise à jour de l'`og:image` actuelle (URL Lovable temporaire) → URL stable du site publié + image hero
- Ajout d'un script JSON-LD `RealEstateAgent` dans `RootShell` :
  ```json
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mathis Guimont",
    "telephone": "+1-819-918-3409",
    "email": "info@mathisguimont.com",
    "address": { "streetAddress": "225 boul. de la Gappe, suite 102", "addressLocality": "Gatineau", "addressRegion": "QC", "addressCountry": "CA" },
    "areaServed": ["Gatineau", "Outaouais", "Hull", "Aylmer", "Buckingham"],
    "url": "https://gatineau-premier-achat.lovable.app",
    "image": "...",
    "sameAs": ["https://instagram.com/mathis_guimont"]
  }
  ```

### `src/routes/sitemap[.]xml.ts` (server route)
Génère un sitemap XML dynamique avec `/` et `/merci` exclu.

### `src/routes/robots[.]txt.ts` (server route)
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /merci
Sitemap: https://gatineau-premier-achat.lovable.app/sitemap.xml
```

## 6. Dashboard admin /admin/leads

### Migration Supabase
Le RLS actuel sur `leads` interdit le SELECT. On ajoute :
- Une fonction `has_role` + table `user_roles` (pattern sécurisé standard)
- Politique « Admins can read all leads » utilisant `has_role(auth.uid(), 'admin')`

### Routes
- `src/routes/admin.tsx` — layout avec garde d'authentification (redirige vers `/admin/login` si non connecté ou non-admin)
- `src/routes/admin.login.tsx` — formulaire email/password Supabase Auth
- `src/routes/admin.leads.tsx` — table des leads avec :
  - Filtre type (Tous / J'achète / Je vends)
  - Recherche par nom/email/téléphone
  - Tri par date desc
  - Détail au clic (modal avec tous les champs)
  - Compteurs en haut (total, acheteurs, vendeurs, cette semaine)

### Configuration auth
- Désactiver email confirmation pour Mathis (création de compte rapide)
- Mathis crée son compte via le formulaire signup, puis on lui assigne le rôle `admin` via une insertion manuelle dans `user_roles`

## Récap fichiers

**Nouveaux :**
- `src/components/landing/Testimonials.tsx`
- `src/components/landing/WhatsAppButton.tsx`
- `src/routes/merci.tsx`
- `src/routes/sitemap[.]xml.ts`
- `src/routes/robots[.]txt.ts`
- `src/routes/admin.tsx` (layout)
- `src/routes/admin.login.tsx`
- `src/routes/admin.leads.tsx`
- 1 migration Supabase (table `user_roles`, fonction `has_role`, policies admin sur `leads`)

**Modifiés :**
- `src/routes/index.tsx` (insère Testimonials + WhatsAppButton)
- `src/routes/__root.tsx` (JSON-LD, og:image stable)
- `src/components/landing/Hero.tsx` (badge réponse 2h)
- `src/components/landing/LeadForm.tsx` (redirect vers /merci, copie 24h→2h)
