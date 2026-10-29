# The Evolution of Motion

Prototype personnel de narration 3D, non affilié à Boston Dynamics. Interface en anglais, direction Dark Industrial, référence dans `charteGraphique/CHARTE_GRAPHIQUE.md`.

## Lancer

Node.js 22.18 ou supérieur.

```sh
npm ci
npm run dev
```

Ouvrir http://localhost:3000. Les liens latéraux permettent d’atteindre les cinq chapitres. Le bouton « Motion on » réduit les déplacements, le flottement et le défilement doux. La préférence système de réduction du mouvement reste prioritaire.

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

## Architecture

- `app/` : page, métadonnées et styles.
- `components/experience/experience.tsx` : contenu HTML, navigation et timeline GSAP réversible.
- `scene.tsx` : canvas persistant et trajectoires des trois robots.
- `robot.tsx` : chargement, clonage et normalisation des GLB.
- `camera-rig.tsx` et `lighting.tsx` : cadrage responsive et éclairages.
- `lib/story.ts` : chapitres et interpolation indépendante du sens du scroll.
- `tests/` : continuité, retour du scroll et décodage des modèles compressés.

Les déplacements 3D passent par des références, sans mise à jour React à chaque image. GSAP pilote le parcours ; React Three Fiber applique les poses. Les micro-interactions utilisent CSS. Motion et shadcn/ui ne sont pas installés, aucun composant ne les nécessite actuellement.

## Modèles

Les originaux restent dans `models/`. Les versions utilisées sont dans `public/models/*.web.glb`. Pour les régénérer :

```sh
npm run models:optimize
```

La préparation applique déduplication, suppression des données inutilisées, quantification et compression Meshopt. Aucun passage de simplification géométrique ni de réduction des textures. Les tests comparent le nombre de triangles et de textures après décodage.

| Modèle | Source | Version web |
|---|---|---|
| Spot | 67,97 Mio | 11,89 Mio |
| Atlas | 43,88 Mio | 7,94 Mio |
| Drone | 0,40 Mio | 0,35 Mio |

Les crédits, sources et licences sont dans `docs/ASSETS.md` et le pied de page. Atlas est un scan monochrome, présenté avec une finition acier créée pour l’expérience.

## Limites de cette première version

- Aucun GLB ne contient de clip d’animation. Les poses articulées et la marche ne sont pas simulées : les déplacements concernent les groupes complets, la caméra et le drone.
- Le drone est un compagnon visuel, sans dialogue ni fonction d’IA.
- Environ 2,56 millions de triangles restent dans les assets. La compression réduit le transfert, pas automatiquement la mémoire GPU ni le coût de rendu. Le DPR est plafonné à 1,5 ; des LOD mobiles et une qualité adaptative restent à préparer.
- La version mobile a un cadrage distinct. Les performances sur téléphone physique restent à mesurer.
- Sans WebGL2, en cas d’erreur d’asset ou de perte du contexte, le contenu HTML et la navigation restent disponibles. Sans JavaScript, les chapitres restent lisibles.
- Les polices sont chargées depuis Google Fonts avec des polices système de repli.

Aucun commit, push ni déploiement n’a été effectué.
