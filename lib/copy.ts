export type Locale = 'en' | 'fr';

type Translation = {
  chapters: [string, string, string, string, string];
  ui: Record<'skip' | 'home' | 'index' | 'study' | 'chapters' | 'controls' | 'reduce' | 'resume' | 'systemReduced' | 'motionOn' | 'motionReduced' | 'loading' | 'assetError' | 'unavailable' | 'interactive' | 'noJs' | 'credits' | 'language' | 'theme' | 'light' | 'dark', string>;
  hero: Record<'eyebrow' | 'titleTop' | 'titleOutline' | 'titleBottom' | 'caption' | 'captionSecondary' | 'scroll' | 'specimen' | 'descriptor' | 'bottom', string>;
  evolution: Record<'eyebrow' | 'titleTop' | 'titleBottom' | 'body' | 'annotation', string>;
  atlas: Record<'eyebrow' | 'titleTop' | 'titleBottom' | 'body' | 'tag' | 'annotation', string>;
  beyond: Record<'eyebrow' | 'titleTop' | 'titleBottom' | 'body' | 'secondEyebrow' | 'secondTop' | 'secondBottom' | 'secondBody', string> & { notes: [string, string, string] };
  frontier: Record<'eyebrow' | 'titleTop' | 'titleBottom' | 'body' | 'replay', string>;
  footer: Record<'intro' | 'disclaimer' | 'license' | 'sourceLabel' | 'sourceLinkLabel' | 'companion', string>;
  loader: Record<'initialization' | 'connecting' | 'ready' | 'titleTop' | 'titleBottom' | 'progressLabel' | 'preparing' | 'calibrated' | 'note' | 'initializing' | 'explore' | 'skip', string>;
  officialLinks: { label: string; url: string }[];
};

export const copy: Record<Locale, Translation> = {
  en: {
    chapters: ['The awakening', 'From four to two', 'Meet Atlas', 'Beyond the robot', 'The next frontier'],
    ui: {
      skip: 'Skip to the story', home: 'The Evolution of Motion, back to beginning', index: 'THE EXPLORATION', study: 'INDEPENDENT ROBOTICS STUDY', chapters: 'Chapters', controls: 'Experience controls',
      reduce: 'Reduce cinematic motion', resume: 'Resume cinematic motion', systemReduced: 'Reduced motion follows your system preference', motionOn: 'MOTION ON', motionReduced: 'REDUCED MOTION',
      loading: 'Preparing the scene', assetError: 'Some 3D assets could not load. The story remains available.', unavailable: '3D unavailable. Continue exploring the story.', interactive: 'Interactive 3D study', noJs: 'The story is available below. Enable JavaScript for interactive 3D.',
      credits: '3D model credits', language: 'Language', theme: 'Appearance', light: 'Light theme', dark: 'Dark theme',
    },
    hero: {
      eyebrow: 'ROBOTICS, BEYOND THE LAB', titleTop: 'THE EVOLUTION', titleOutline: 'OF', titleBottom: 'MOTION',
      caption: 'Spot brings mobile sensing to industrial sites.', captionSecondary: 'Inspection. Data collection. Remote exploration.', scroll: 'SCROLL TO EXPLORE', specimen: '01 / SPOT', descriptor: 'QUADRUPED ROBOT\nINDUSTRIAL INSPECTION', bottom: 'SCROLL-DRIVEN EXPERIENCE',
    },
    evolution: {
      eyebrow: '02 / FROM FOUR TO TWO', titleTop: 'DIFFERENT FORMS.', titleBottom: 'REAL-WORLD WORK.',
      body: 'Spot supports industrial inspection, digital twins and research. Its payloads can add sensors or an arm.\nStretch handles cases in warehouses, including trailer unloading.',
      annotation: 'An artistic comparison of robot forms, not a direct evolutionary lineage.',
    },
    atlas: {
      eyebrow: '03 / THE HUMANOID', titleTop: 'MEET', titleBottom: 'ATLAS.',
      body: 'Today’s Atlas is an electric humanoid designed for industrial material handling. Boston Dynamics describes autonomous battery exchanges and integration with workplace systems.',
      tag: 'ATLAS / HISTORICAL 3D SCAN',
      annotation: 'The displayed scan depicts an earlier Atlas generation. Product information refers to the current robot, not this model.',
    },
    beyond: {
      eyebrow: '04 / ROBOTS AT WORK', titleTop: 'BEYOND', titleBottom: 'THE MACHINE.',
      body: 'From inspection to material handling, each platform addresses a different operational need.',
      notes: ['INDUSTRIAL INSPECTION', 'MATERIAL HANDLING', 'FLEET SUPERVISION'],
      secondEyebrow: '04 / A CONNECTED ECOSYSTEM', secondTop: 'ROBOTS.', secondBottom: 'DATA. CONTEXT.',
      secondBody: 'Orbit brings robot fleet supervision and inspection data together. Stretch focuses on warehouse case handling.\nExplore their official product pages below.',
    },
    frontier: { eyebrow: '05 / KEEP EXPLORING', titleTop: 'THE NEXT', titleBottom: 'FRONTIER.', body: 'Discover the products and their applications at Boston Dynamics.', replay: 'EXPERIENCE AGAIN' },
    footer: {
      intro: 'AN INDEPENDENT EXPERIMENT IN MOTION.', disclaimer: 'Unofficial concept, not affiliated with Boston Dynamics.',
      license: 'All models: CC BY 4.0. Scaled and staged; Atlas material adapted for this study.', sourceLabel: 'OFFICIAL PRODUCT INFORMATION', sourceLinkLabel: 'Visit Boston Dynamics',
      companion: 'The drone is an independent visual guide, not a Boston Dynamics product.',
    },
    loader: {
      initialization: 'VOL. 001 / INITIALIZATION', connecting: 'ESTABLISHING CONNECTION', ready: 'SYSTEM READY', titleTop: 'MOTION', titleBottom: 'IS LOADING.', progressLabel: 'Preparing 3D models', preparing: 'PREPARING MODELS & MATERIALS', calibrated: 'SCENE CALIBRATED', note: 'A moment to bring the machinery to life.', initializing: 'SYSTEM INITIALIZING', explore: 'READY TO EXPLORE', skip: 'CONTINUE WITHOUT WAITING',
    },
    officialLinks: [
      { label: 'Spot / Industrial inspection', url: 'https://bostondynamics.com/products/spot/' },
      { label: 'Atlas / Industrial humanoid', url: 'https://bostondynamics.com/products/atlas/' },
      { label: 'Stretch / Warehouse automation', url: 'https://bostondynamics.com/products/stretch/' },
      { label: 'Orbit / Fleet and inspection software', url: 'https://bostondynamics.com/products/orbit/' },
      { label: 'Industrial inspection', url: 'https://bostondynamics.com/solutions/inspection/' },
      { label: 'Digital twins', url: 'https://bostondynamics.com/solutions/digital-twin/' },
      { label: 'Safety & response', url: 'https://bostondynamics.com/solutions/safety/' },
      { label: 'Warehouse automation', url: 'https://bostondynamics.com/solutions/warehouse-automation/' },
      { label: 'Research & development', url: 'https://bostondynamics.com/solutions/rd/' },
      { label: 'Industries', url: 'https://bostondynamics.com/industry/' },
      { label: 'Resources', url: 'https://bostondynamics.com/resources/' },
      { label: 'About Boston Dynamics', url: 'https://bostondynamics.com/about/' },
      { label: 'Ethics', url: 'https://bostondynamics.com/ethics/' },
    ],
  },
  fr: {
    chapters: ['L’éveil', 'De quatre à deux', 'Voici Atlas', 'Au-delà du robot', 'Le prochain horizon'],
    ui: {
      skip: 'Aller au récit', home: 'The Evolution of Motion, retour au début', index: 'L’EXPLORATION', study: 'ÉTUDE INDÉPENDANTE DE ROBOTIQUE', chapters: 'Chapitres', controls: 'Réglages de l’expérience',
      reduce: 'Réduire les mouvements cinématiques', resume: 'Reprendre les mouvements cinématiques', systemReduced: 'Les mouvements sont réduits selon votre préférence système', motionOn: 'MOUVEMENT ACTIF', motionReduced: 'MOUVEMENT RÉDUIT',
      loading: 'Préparation de la scène', assetError: 'Certains modèles 3D n’ont pas pu être chargés. Le récit reste disponible.', unavailable: '3D indisponible. Poursuivez la découverte du récit.', interactive: 'Étude 3D interactive', noJs: 'Le récit est disponible ci-dessous. Activez JavaScript pour la 3D interactive.',
      credits: 'Crédits des modèles 3D', language: 'Langue', theme: 'Apparence', light: 'Thème clair', dark: 'Thème sombre',
    },
    hero: {
      eyebrow: 'LA ROBOTIQUE HORS DU LABORATOIRE', titleTop: 'L’ÉVOLUTION', titleOutline: 'DU', titleBottom: 'MOUVEMENT',
      caption: 'Spot collecte des données sur les sites industriels.', captionSecondary: 'Inspection. Mesure. Exploration à distance.', scroll: 'DÉFILER POUR EXPLORER', specimen: '01 / SPOT', descriptor: 'ROBOT QUADRUPÈDE\nINSPECTION INDUSTRIELLE', bottom: 'EXPÉRIENCE AU DÉFILEMENT',
    },
    evolution: {
      eyebrow: '02 / DE QUATRE À DEUX', titleTop: 'DES FORMES.', titleBottom: 'DES USAGES.',
      body: 'Spot sert à l’inspection, aux jumeaux numériques et à la recherche. Il accueille des capteurs ou un bras.\nStretch manutentionne des colis en entrepôt, notamment lors du déchargement.',
      annotation: 'Un rapprochement artistique entre formes robotiques, pas une lignée évolutive directe.',
    },
    atlas: {
      eyebrow: '03 / L’HUMANOÏDE', titleTop: 'VOICI', titleBottom: 'ATLAS.',
      body: 'L’Atlas actuel est un humanoïde électrique destiné à la manutention industrielle. Boston Dynamics présente le remplacement autonome des batteries et l’intégration aux systèmes de travail.',
      tag: 'ATLAS / SCAN 3D HISTORIQUE',
      annotation: 'Ce scan représente une ancienne génération d’Atlas. Les informations produit concernent le robot actuel, pas ce modèle.',
    },
    beyond: {
      eyebrow: '04 / LES ROBOTS AU TRAVAIL', titleTop: 'AU-DELÀ', titleBottom: 'DE LA MACHINE.',
      body: 'De l’inspection à la manutention, chaque plateforme répond à un besoin opérationnel différent.',
      notes: ['INSPECTION INDUSTRIELLE', 'MANUTENTION', 'SUPERVISION DES FLOTTES'],
      secondEyebrow: '04 / UN ÉCOSYSTÈME CONNECTÉ', secondTop: 'ROBOTS.', secondBottom: 'DONNÉES. CONTEXTE.',
      secondBody: 'Orbit réunit supervision des flottes robotiques et données d’inspection. Stretch se concentre sur la manutention de colis en entrepôt.\nConsultez leurs pages officielles ci-dessous.',
    },
    frontier: { eyebrow: '05 / POURSUIVRE LA DÉCOUVERTE', titleTop: 'LE PROCHAIN', titleBottom: 'HORIZON.', body: 'Découvrez les produits et leurs applications chez Boston Dynamics.', replay: 'REVIVRE L’EXPÉRIENCE' },
    footer: {
      intro: 'UNE EXPÉRIENCE INDÉPENDANTE AUTOUR DU MOUVEMENT.', disclaimer: 'Concept non officiel, sans affiliation à Boston Dynamics.',
      license: 'Tous les modèles : CC BY 4.0. Échelle et mise en scène adaptées ; matériau d’Atlas modifié pour cette étude.', sourceLabel: 'INFORMATIONS PRODUIT OFFICIELLES', sourceLinkLabel: 'Consulter Boston Dynamics',
      companion: 'Le drone est un guide visuel indépendant, pas un produit Boston Dynamics.',
    },
    loader: {
      initialization: 'VOL. 001 / INITIALISATION', connecting: 'ÉTABLISSEMENT DE LA CONNEXION', ready: 'SYSTÈME PRÊT', titleTop: 'LE MOUVEMENT', titleBottom: 'SE PRÉPARE.', progressLabel: 'Préparation des modèles 3D', preparing: 'MODÈLES ET MATÉRIAUX EN PRÉPARATION', calibrated: 'SCÈNE CALIBRÉE', note: 'Un instant pour donner vie aux machines.', initializing: 'INITIALISATION DU SYSTÈME', explore: 'PRÊT À EXPLORER', skip: 'CONTINUER SANS ATTENDRE',
    },
    officialLinks: [
      { label: 'Spot / Inspection industrielle', url: 'https://bostondynamics.com/products/spot/' },
      { label: 'Atlas / Humanoïde industriel', url: 'https://bostondynamics.com/products/atlas/' },
      { label: 'Stretch / Automatisation des entrepôts', url: 'https://bostondynamics.com/products/stretch/' },
      { label: 'Orbit / Gestion des flottes et inspections', url: 'https://bostondynamics.com/products/orbit/' },
      { label: 'Inspection industrielle', url: 'https://bostondynamics.com/solutions/inspection/' },
      { label: 'Jumeaux numériques', url: 'https://bostondynamics.com/solutions/digital-twin/' },
      { label: 'Sécurité et intervention', url: 'https://bostondynamics.com/solutions/safety/' },
      { label: 'Automatisation des entrepôts', url: 'https://bostondynamics.com/solutions/warehouse-automation/' },
      { label: 'Recherche et développement', url: 'https://bostondynamics.com/solutions/rd/' },
      { label: 'Secteurs d’activité', url: 'https://bostondynamics.com/industry/' },
      { label: 'Ressources', url: 'https://bostondynamics.com/resources/' },
      { label: 'À propos de Boston Dynamics', url: 'https://bostondynamics.com/about/' },
      { label: 'Éthique', url: 'https://bostondynamics.com/ethics/' },
    ],
  },
};
