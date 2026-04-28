# 🎨 PALETTES DE COULEURS — Bannières Immobilières

> Palettes prédéfinies pour chaque bannière immobilière.
> Modifier les variables dans `src/styles.css` → `:root {}` pour rebrander le site.
> Dernière mise à jour : 2026-04-28

---

## Comment utiliser

1. Identifier la bannière du courtier (Royal LePage, RE/MAX, etc.)
2. Copier les variables `oklch` ci-dessous
3. Les coller dans `src/styles.css` → bloc `:root {}`
4. Le site est instantanément rebrandé !

---

## 🔴 Intralys — Par défaut (Mathis Guimont)

```css
--navy: oklch(0.21 0.04 260);
--navy-deep: oklch(0.16 0.035 260);
--crimson: oklch(0.56 0.22 25);
--crimson-glow: oklch(0.63 0.24 25);
--cream: oklch(0.97 0.01 80);
```

**Accent :** Rouge crimson | **Fond :** Bleu navy profond

---

## 🔵 Royal LePage

```css
--navy: oklch(0.20 0.03 250);
--navy-deep: oklch(0.15 0.025 250);
--crimson: oklch(0.50 0.18 250);       /* Bleu Royal */
--crimson-glow: oklch(0.58 0.20 250);
--cream: oklch(0.97 0.005 250);
```

**Accent :** Bleu royal | **Fond :** Bleu sombre
**Couleurs officielles :** #003DA5 (bleu), #FFD700 (or)

---

## 🔴 RE/MAX

```css
--navy: oklch(0.18 0.02 260);
--navy-deep: oklch(0.13 0.015 260);
--crimson: oklch(0.52 0.23 28);        /* Rouge RE/MAX */
--crimson-glow: oklch(0.60 0.25 28);
--cream: oklch(0.97 0.01 80);
```

**Accent :** Rouge vif | **Fond :** Bleu foncé
**Couleurs officielles :** #DC1C2E (rouge), #003DA5 (bleu), #FFFFFF (blanc)

---

## 🟢 Sutton

```css
--navy: oklch(0.22 0.04 160);
--navy-deep: oklch(0.17 0.035 160);
--crimson: oklch(0.55 0.18 160);       /* Vert Sutton */
--crimson-glow: oklch(0.62 0.20 160);
--cream: oklch(0.97 0.01 80);
```

**Accent :** Vert émeraude | **Fond :** Vert foncé
**Couleurs officielles :** #006838 (vert), #000000 (noir)

---

## 🟡 Century 21

```css
--navy: oklch(0.20 0.03 60);
--navy-deep: oklch(0.15 0.025 50);
--crimson: oklch(0.65 0.18 85);        /* Or Century 21 */
--crimson-glow: oklch(0.72 0.20 85);
--cream: oklch(0.97 0.01 80);
```

**Accent :** Or / doré | **Fond :** Brun foncé
**Couleurs officielles :** #B5985A (or), #1C1C1C (noir)

---

## 🟣 Via Capitale

```css
--navy: oklch(0.20 0.04 300);
--navy-deep: oklch(0.15 0.035 300);
--crimson: oklch(0.50 0.20 300);       /* Violet Via Capitale */
--crimson-glow: oklch(0.58 0.22 300);
--cream: oklch(0.97 0.01 80);
```

**Accent :** Violet | **Fond :** Violet foncé
**Couleurs officielles :** #6A1B9A (violet), #FFFFFF (blanc)

---

## 🔵 Engel & Völkers

```css
--navy: oklch(0.15 0.01 260);
--navy-deep: oklch(0.10 0.005 260);
--crimson: oklch(0.55 0.20 25);        /* Rouge E&V */
--crimson-glow: oklch(0.62 0.22 25);
--cream: oklch(0.97 0.005 80);
```

**Accent :** Rouge sobre | **Fond :** Noir profond
**Couleurs officielles :** #CC0000 (rouge), #000000 (noir)

---

## 🏠 Courtier Indépendant (neutre)

```css
--navy: oklch(0.22 0.02 230);
--navy-deep: oklch(0.17 0.015 230);
--crimson: oklch(0.58 0.15 230);       /* Bleu acier */
--crimson-glow: oklch(0.65 0.17 230);
--cream: oklch(0.97 0.005 230);
```

**Accent :** Bleu acier | **Fond :** Gris-bleu
**Note :** Palette neutre qui s'adapte à tout branding personnel.

---

## Personnalisation avancée

Pour créer une palette sur mesure à partir d'une couleur hex :

1. Aller sur [oklch.com](https://oklch.com)
2. Entrer la couleur hex du client
3. Copier la valeur `oklch(L C H)`
4. `--crimson` = la couleur principale
5. `--crimson-glow` = même couleur avec +0.07 de luminosité
6. `--navy` = teinte complémentaire, très sombre (L ≤ 0.22)
7. `--navy-deep` = encore plus sombre (L ≤ 0.17)
