import type { Locale } from './copy';

type RobotText = { category: string; summary: string; description: string; applications: string[]; note?: string };
export type Robot = {
  slug: string;
  name: string;
  source: string;
  model?: string;
  finish?: boolean;
  text: Record<Locale, RobotText>;
};

export const robots: Robot[] = [
  {
    slug: 'spot', name: 'Spot', source: 'https://bostondynamics.com/products/spot/',
    model: '/models/spotboston_dynamic_high_poly.web.glb',
    text: {
      en: { category: 'Mobile sensing', summary: 'A quadruped for industrial inspection and data collection.', description: 'Spot brings mobile sensing to industrial sites. Sensors and an optional arm extend the kinds of work the platform can support.', applications: ['Industrial inspection', 'Digital twins', 'Research and development'] },
      fr: { category: 'Collecte mobile', summary: 'Un quadrupède pour l’inspection industrielle et la collecte de données.', description: 'Spot apporte des capacités de mesure mobiles aux sites industriels. Des capteurs et un bras optionnel élargissent les usages de la plateforme.', applications: ['Inspection industrielle', 'Jumeaux numériques', 'Recherche et développement'] },
    },
  },
  {
    slug: 'atlas', name: 'Atlas', source: 'https://bostondynamics.com/products/atlas/',
    model: '/models/atlas_robot_scan.web.glb', finish: true,
    text: {
      en: { category: 'Industrial humanoid', summary: 'An electric humanoid designed for industrial material handling.', description: 'The current Atlas focuses on industrial material handling. Boston Dynamics describes autonomous battery exchanges and integration with workplace systems.', applications: ['Industrial material handling', 'Integration with workplace systems'], note: 'Historical 3D scan: this model depicts an earlier Atlas generation. The product information describes the current electric robot.' },
      fr: { category: 'Humanoïde industriel', summary: 'Un humanoïde électrique destiné à la manutention industrielle.', description: 'L’Atlas actuel se concentre sur la manutention industrielle. Boston Dynamics présente le remplacement autonome des batteries et l’intégration aux systèmes de travail.', applications: ['Manutention industrielle', 'Intégration aux systèmes de travail'], note: 'Scan 3D historique : ce modèle représente une ancienne génération d’Atlas. Les informations produit décrivent le robot électrique actuel.' },
    },
  },
  {
    slug: 'stretch', name: 'Stretch', source: 'https://bostondynamics.com/products/stretch/',
    text: {
      en: { category: 'Warehouse automation', summary: 'A robot dedicated to case handling in warehouses.', description: 'Stretch handles cases in warehouse operations, including unloading trailers. Its role is distinct from mobile inspection and humanoid material handling.', applications: ['Warehouse case handling', 'Trailer unloading'], note: 'This study does not include a 3D model of Stretch.' },
      fr: { category: 'Automatisation des entrepôts', summary: 'Un robot dédié à la manutention de colis en entrepôt.', description: 'Stretch manutentionne des colis en entrepôt, notamment lors du déchargement de remorques. Son rôle se distingue de l’inspection mobile et de la manutention humanoïde.', applications: ['Manutention de colis', 'Déchargement de remorques'], note: 'Cette étude ne comprend pas de modèle 3D de Stretch.' },
    },
  },
];

export function getRobot(slug: string) { return robots.find((robot) => robot.slug === slug); }
