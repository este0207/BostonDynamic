# The Evolution of Motion

Prototype personnel de narration 3D, non affilié à Boston Dynamics. Interface en anglais par défaut, traduction française et thèmes sombre/clair, direction industrielle, référence dans `charteGraphique/CHARTE_GRAPHIQUE.md`.

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

## Chargement initial

Un écran d’initialisation reprend le fond noir, les accents orange et la typographie technique. Sa progression suit le gestionnaire de chargement des assets. La révélation attend que les trois modèles et l’éclairage soient montés et que la scène ait rendu ses premières images. Le canvas reste monté lors du fondu.

Le bouton « Continue without waiting » et la touche Échap permettent de poursuivre sans attendre. Les erreurs 3D et l’absence de WebGL libèrent aussi l’écran. Le mouvement réduit désactive les rotations décoratives et le fondu ; sans JavaScript, cet écran est masqué pour laisser le contenu lisible.

## Langue, apparence et contenu officiel

Les boutons EN/FR et soleil/lune restent disponibles dans l’en-tête et pendant le chargement. Le choix est conservé localement ; un nouveau visiteur arrive en anglais et en thème sombre. Les changements gardent le même canvas et la même position dans le récit. `html.lang` suit la langue sélectionnée. Le thème clair adapte les contrastes HTML, le sol, le brouillard et l’éclairage 3D.

Les textes sont centralisés dans `lib/copy.ts`. Ils synthétisent les pages officielles de Spot, Atlas, Stretch et Orbit ; les sources sont liées dans l’interface et détaillées dans `docs/CONTENT_SOURCES.md`. Le scan historique d’Atlas est distingué du produit actuel. La traduction française est propre au projet.

## Pages et navigation

La navbar commune dessert l’accueil `/`, le catalogue `/robots`, les usages `/applications` et le projet `/about`. Les fiches `/robots/spot`, `/robots/atlas` et `/robots/stretch` disposent de métadonnées et de liens vers leurs sources officielles. Les slugs inconnus retournent une page 404.

Spot et Atlas ont une vue 3D manipulable avec rotation automatique facultative. Stretch dispose d’une fiche textuelle, sans modèle inventé. Le drone accompagne les pages de lecture et peut être mis en pause. Le menu mobile utilise un contrôle natif, se ferme au choix d’une page ou avec Échap et indique la page active. Langue et thème sont conservés entre les pages.

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
