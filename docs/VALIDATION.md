# Validation du prototype

Date : 29 octobre 2026.

- TypeScript : `npm run typecheck` passe.
- Lint : `npm run lint` passe sans avertissement.
- Tests : `npm test`, cinq tests passent, dont le décodage des trois modèles Meshopt et la conservation de leurs triangles et textures.
- Production : `npm run build` passe sans avertissement de compilation après correction de l’import CSS des polices.
- Revue indépendante BYAN : les quatre constats ciblés ont été corrigés et revérifiés par le relecteur.
- Chrome : affichage réel de Spot, Atlas et du drone vérifié ; navigation par chapitres et retour vers le début testés.
- Émulation mobile 400 × 814 : séparation texte/robots corrigée et revue visuellement ; conclusion et bouton de mouvement réduit testés.

Limites de vérification : pas de mesure de FPS ni de test sur téléphone physique. Le repli sans WebGL est implémenté ; son affichage a été observé pendant le rechargement de développement, sans campagne de compatibilité GPU. Le navigateur de test injecte des attributs `data-lt-installed` sur `html`, ce qui déclenche un avertissement d’hydratation provenant de cette modification externe. React Three Fiber utilise encore `THREE.Clock`, signalé comme déprécié par la version de Three.js installée. Ces avertissements n’ont pas empêché l’affichage ni la navigation testés.

## Chargement initial

- Écran industriel observé en connexion Slow 4G, cache désactivé : progression des assets visible et contenu protégé pendant l’attente.
- Fin de chargement observée : retrait de l’écran et retour à la scène interactive. Débit normal rétabli après le test.
- TypeScript, lint et les cinq tests passent après intégration.
- Build final validé avec `npm run build -- --webpack`. La tentative Turbopack a échoué sur une ouverture de port refusée par l’environnement de validation, y compris après demande d’exécution hors bac à sable.

## Contenu officiel, langues et thèmes

- Deux tâches exécutées en parallèle : synthèse des sources officielles et préférences/thèmes ; intégration et validation dans le fil principal.
- TypeScript et lint passent. Sept tests passent, dont parité EN/FR des champs visibles/accessibles et cohérence des liens officiels.
- Build de production validé avec `npm run build -- --webpack`.
- Chrome desktop et émulation 400 × 814 : changements EN/FR et clair/sombre contrôlés visuellement. Préférences FR/clair restaurées après rechargement, y compris dans l’écran de chargement.
- Les pages sources et la distinction entre scan historique et Atlas actuel sont consignées dans `CONTENT_SOURCES.md`.
- La qualité sur téléphone physique reste à vérifier ; aucune mesure de FPS n’est ajoutée.

## Navigation multipage

- Routes `/`, `/robots`, `/applications`, `/about`, `/robots/spot`, `/robots/atlas` et `/robots/stretch` contrôlées : HTTP 200. `/robots/unknown` retourne HTTP 404.
- Catalogue Robots vérifié visuellement sur desktop ; modèle Spot et contrôle de rotation testés.
- Menu mobile contrôlé à 400 × 814 : ouverture, passage vers Applications et fermeture du menu, conservation du français.
- Les pistes de grille des vues 3D ont été bornées pour éviter leur élargissement par la taille intrinsèque du canvas.
- Le build génère les trois fiches avec `generateStaticParams`. Aucun modèle Stretch n’est simulé.
