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
