# THE EVOLUTION OF MOTION
## Charte graphique et direction artistique

**Projet :** expérience web 3D immersive inspirée de l'univers robotique de Boston Dynamics  
**Version :** 1.0 — 28 octobre 2026  
**Langue du site :** anglais  
**Positionnement :** portfolio expérimental / musée interactif, non officiel

---

## 1. Vision créative

Créer une expérience cinématique pilotée par le défilement, racontant une progression artistique de la robotique : quadrupède inspiré de Spot → transition vers la locomotion bipède → humanoïde inspiré d'Atlas. Un drone sphérique accompagne le visiteur tout au long du parcours. Le site doit ressembler à un court-métrage interactif plutôt qu'à une landing page conventionnelle.

**Mots-clés :** photoréaliste, industriel, mystérieux, premium, précis, monumental, immersif, minimaliste.

**Principes :**
- La 3D est le sujet principal ; l'interface reste discrète.
- Chaque animation contribue à la narration.
- L'éclairage révèle les volumes progressivement.
- Les textes sont courts, lisibles et en anglais.
- Le scroll contrôle l'histoire, dans les deux sens.
- Le site reste utilisable sans WebGL avancé ni animations complexes.

> Note éditoriale : Spot et Atlas ne constituent pas une lignée évolutive directe. Présenter leur succession comme un parcours narratif, et non comme une chronologie scientifique officielle.

## 2. Identité visuelle

### 2.1 Palette

| Token | Couleur | Usage |
|---|---|---|
| `--color-void` | `#080A0D` | Fond principal, scènes nocturnes |
| `--color-graphite` | `#1C232B` | Surfaces secondaires, panneaux |
| `--color-steel` | `#8B959F` | Métadonnées, détails techniques |
| `--color-white` | `#F2F4F5` | Titres, texte principal |
| `--color-signal` | `#E6A348` | Accent ponctuel, repères, progression |

**Répartition cible :** 75 % noir / graphite, 20 % blanc / gris, 5 % maximum d'orange. Éviter les dégradés néon saturés, le violet SaaS et les couleurs décoratives non justifiées.

### 2.2 Typographies

- **Titres / affichage :** Space Grotesk (ou Geist), graisses 500–700, capitales ponctuelles, tracking légèrement resserré.
- **Texte courant :** Geist ou Space Grotesk, graisses 400–500.
- **Métadonnées / chiffres :** IBM Plex Mono, graisses 400–500, capitales et espacement augmenté.

| Élément | Desktop | Mobile | Notes |
|---|---|---|---|
| Hero H1 | `clamp(4rem, 9vw, 9rem)` | `clamp(2.8rem, 13vw, 5rem)` | Interligne 0.9–1.0 |
| H2 | `clamp(2.8rem, 5vw, 5.5rem)` | `clamp(2rem, 8vw, 3.5rem)` | Interligne 1.0–1.1 |
| Texte | 16–18 px | 15–16 px | Largeur 45–60 caractères |
| Micro-label | 11–12 px | 10–11 px | Mono, tracking 0.12em |

Privilégier une hiérarchie claire et des titres très courts : **THE EVOLUTION OF MOTION**, **FROM FOUR TO TWO**, **MEET ATLAS**, **BUILT TO GO BEYOND**.

### 2.3 Composition

- Grille de 12 colonnes desktop, 4 colonnes mobile.
- Marges horizontales : `clamp(20px, 5vw, 96px)`.
- Hero plein écran (`100svh`), avec zones de sécurité pour titres et navigation.
- Beaucoup d'espace négatif autour des robots.
- Alternance texte à gauche / robot à droite puis inversement, sans masquer les articulations essentielles.
- Les panneaux et encadrés sont rares, transparents et très fins.

## 3. Direction 3D

### 3.1 Modèles et matériaux

- Modèles 3D GLB/GLTF, de préférence riggés et animés.
- Matériaux PBR : métal brossé, polymères mats, surfaces peintes, joints caoutchoutés.
- Roughness variée ; éviter l'effet plastique brillant uniforme.
- Textures réalistes mais contrôlées : micro-rayures discrètes, usure légère, aucune saleté excessive.
- Échelle cohérente entre les robots ; caméra ajustée au sujet.
- Ne pas présenter de modèle générique comme un modèle officiel.

### 3.2 Éclairage cinématique

- **Key light :** source principale latérale, neutre/froide, révèle les formes.
- **Rim light :** contre-jour fin sur les contours pour séparer le robot du fond.
- **Fill light :** très faible, préserve les zones d'ombre.
- **Accent chaud :** touche orange subtile sur certaines pièces ou à la transition.
- Contact shadows et ambient occlusion mesurées ; bloom très discret si nécessaire.

Éviter la surexposition, les reflets brûlés, le brouillard dense et les effets post-processing qui dégradent les détails du modèle.

### 3.3 Caméra

- Caméra perspective avec mouvements lents et contrôlés.
- Plans : détail mécanique → plan moyen → révélation plein corps.
- Interpolation amortie, sans secousses.
- Les mouvements de souris doivent rester subtils et ne jamais empêcher la lecture.
- Adapter cadrage et distance focale au mobile plutôt que simplement réduire la scène desktop.

## 4. Storyboard et scroll

| Progression indicative | Chapitre | Mise en scène | Texte |
|---|---|---|---|
| 0–20 % | The Awakening | Quadrupède au centre/droite, idle, suivi léger de souris | `THE EVOLUTION OF MOTION` / `Engineering the impossible.` |
| 20–40 % | From Four to Two | Spot quitte progressivement le cadre ; transition de caméra et de lumière vers Atlas, sans troisième robot terrestre | `FROM FOUR TO TWO` |
| 40–65 % | Meet Atlas | Gros plan sur la tête, dézoom jusqu'au corps entier | `MEET ATLAS` |
| 65–90 % | Built to Go Beyond | Robot et texte alternent gauche/droite ; détails techniques | `BUILT TO GO BEYOND.` |
| 90–100 % | The Next Frontier | Assombrissement, symbole mécanique central animé au survol | `THE NEXT FRONTIER` |

Ces pourcentages sont des repères de conception, à ajuster après tests utilisateurs.

### Règles d'animation

- Une scène WebGL persistante sur toute l'expérience.
- GSAP + ScrollTrigger pour une timeline unique, réversible, avec `scrub`.
- Durées des micro-interactions UI : 180–350 ms ; easing doux.
- Ne pas superposer GSAP et Motion sur la même propriété d'un élément.
- Les textes apparaissent par opacité et déplacement court ; pas de rebonds cartoon.
- Les animations du robot suivent son rig et ses contraintes anatomiques/mécaniques.
- Le scroll vers le haut doit inverser naturellement les transitions.

## 5. Interface et composants

### Navigation

- Logo ou wordmark discret en haut à gauche.
- Indicateur de chapitre / progression en haut à droite ou sur le bord.
- Pas de menu massif au-dessus de la scène.
- États hover/focus visibles et cohérents avec l'accent orange.

### Boutons et liens

- Bouton principal sobre : fond clair, texte sombre, angles très légèrement arrondis.
- Bouton secondaire : transparent, contour fin graphite/acier.
- Hover : légère translation, variation de contraste ou apparition d'une flèche.
- Aucun effet sonore automatique.

### Labels techniques

- Police IBM Plex Mono.
- Petits repères tels que `CHAPTER 03 / ATLAS`, `SCROLL TO EXPLORE`, `SYSTEM ONLINE`.
- Lignes de liaison et coordonnées techniques uniquement lorsqu'elles apportent une information.

### Footer

- Fond presque noir, composition très dépouillée.
- Emblème mécanique central original, animation de rotation ou d'articulation au survol.
- Crédits et mention « Unofficial concept — not affiliated with Boston Dynamics » si la marque est citée.

### Compagnon : drone sphérique

- Utiliser `models/drone_robot.glb` comme compagnon visuel récurrent, distinct de Spot et Atlas.
- Il accompagne la visite : flottement discret, orientation vers le sujet du chapitre et déplacements ponctuels entre des positions prédéfinies au fil du scroll.
- Conserver le drone dans la scène WebGL persistante ; sa trajectoire est réversible et synchronisée avec la narration.
- Le placer dans les espaces libres, à distance des textes, des contrôles et des silhouettes des robots principaux. Il reste secondaire dans la composition.
- Sur desktop, une réaction légère au pointeur peut renforcer sa présence ; éviter une poursuite permanente du curseur.
- Sur mobile, limiter les déplacements et la taille du compagnon. Avec `prefers-reduced-motion`, le maintenir fixe ou masquer ses mouvements décoratifs.
- Son rôle initial est celui d'un guide visuel. Les interactions d'assistance ou de dialogue seront définies séparément.
- Le modèle ne contient ni rig ni animation intégrée : animer sa position et sa rotation globales suffit pour ce comportement.

## 6. Responsive et accessibilité

- **Desktop :** expérience 3D complète, interactions souris et scroll.
- **Tablette :** cadrages simplifiés, moins d'effets de post-traitement.
- **Mobile :** caméra spécifique, texte prioritaire, gestes tactiles non conflictuels, rendu allégé.
- **Appareils limités :** qualité adaptative, DPR plafonné, textures compressées, chargement différé.
- **`prefers-reduced-motion` :** limiter les déplacements et proposer une navigation directe par chapitres.
- Contenu HTML sémantique et accessible indépendamment du canvas.
- Contrastes vérifiés (viser WCAG AA pour le texte), navigation clavier et focus visibles.
- Éviter tout scroll-jacking qui bloque l'utilisateur.

## 7. Tokens CSS de départ

```css
:root {
  --color-void: #080a0d;
  --color-graphite: #1c232b;
  --color-steel: #8b959f;
  --color-white: #f2f4f5;
  --color-signal: #e6a348;

  --font-display: "Space Grotesk", "Geist", sans-serif;
  --font-body: "Geist", "Space Grotesk", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --page-gutter: clamp(20px, 5vw, 96px);
  --radius-small: 6px;
  --line-subtle: rgba(242, 244, 245, 0.12);
  --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
}

body {
  background: var(--color-void);
  color: var(--color-white);
  font-family: var(--font-body);
}
```

## 8. Stack et architecture recommandées

- **Next.js App Router + TypeScript :** structure, routage, SEO.
- **React Three Fiber + Three.js + Drei :** scène 3D, modèles, caméra, environnement.
- **GSAP + ScrollTrigger :** orchestration des chapitres et du scroll.
- **Motion for React :** micro-interactions UI, sans conflit avec GSAP.
- **Tailwind CSS :** styles et responsive.
- **shadcn/ui :** uniquement si un composant d'interface le justifie.
- **Vercel :** hébergement ; assets 3D optimisés via CDN si nécessaire.

Ne pas ajouter Express ni Neon pour la première version : aucun backend ni stockage persistant n'est nécessaire au prototype.

## 9. Critères de qualité et validation

- Les robots sont réellement en 3D, pas des photographies placées sur un plan.
- L'expérience fonctionne dans les deux sens du scroll.
- Le canvas reste monté et ne clignote pas entre chapitres.
- Les transitions ne créent pas de collisions visuelles avec les textes.
- Le rendu est stable sur desktop et reste utilisable sur mobile.
- Le site conserve une version lisible lorsque WebGL ou les animations sont indisponibles.
- Les ressources sont correctement licenciées et créditées.
- Vérifier TypeScript, lint, build, tests de navigation et performances réelles.

## 10. Règles de marque et droits

Le projet est une **création conceptuelle non officielle** inspirée de l'industrie robotique. Vérifier les conditions d'utilisation des marques, logos, photographies et modèles Boston Dynamics. Ne pas reprendre un logo officiel pour suggérer une affiliation. Privilégier un emblème original et conserver la provenance et les licences des modèles 3D dans un inventaire d'assets.

---

**Direction créative en une phrase :** *A cinematic journey through motion, machinery and the future of robotics.*

## 11. Inventaire initial des modèles

Métadonnées lues dans les fichiers GLB locaux ; les tailles correspondent aux fichiers sources, avant optimisation.

| Fichier | Rôle | Taille approximative | Rig | Animations intégrées | Crédit embarqué |
|---|---|---|---|---|---|
| `models/spotboston_dynamic_high_poly.glb` | Robot principal — Spot | 68 Mo | Oui | Aucune | Julliani / Sketchfab, CC BY 4.0 |
| `models/atlas_robot_scan.glb` | Robot principal — Atlas | 44 Mo | Non | Aucune | Idmenthal / Sketchfab, CC BY 4.0 |
| `models/drone_robot.glb` | Compagnon sphérique | 0,4 Mo | Non | Aucune | noortjeschuur / Sketchfab, CC BY 4.0 |

Prévoir une optimisation géométrique des deux robots principaux avant diffusion web. Le rig de Spot ne fournit pas de cycle de marche ; le scan Atlas nécessite une préparation supplémentaire pour une animation articulée. Conserver les auteurs, les liens source et la licence embarqués pour les crédits du site.
