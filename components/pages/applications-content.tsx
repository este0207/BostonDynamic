'use client';

import { usePreferences } from '@/components/experience/preferences';
import { copy } from '@/lib/copy';

const applications = [
  {
    source: 4,
    en: 'Spot brings mobile sensing and data collection to industrial inspection. Orbit brings inspection data and robot fleet supervision together.',
    fr: 'Spot apporte des capteurs mobiles et la collecte de données à l’inspection industrielle. Orbit réunit les données d’inspection et la supervision des flottes robotiques.',
  },
  {
    source: 5,
    en: 'Spot supports digital twin workflows through data collection. Explore how Boston Dynamics connects mobile robotics with digital representations of industrial sites.',
    fr: 'Spot contribue aux jumeaux numériques par la collecte de données. Découvrez comment Boston Dynamics relie la robotique mobile aux représentations numériques des sites industriels.',
  },
  {
    source: 7,
    en: 'Stretch handles cases in warehouses, including trailer unloading. Its role is distinct from the inspection work of Spot.',
    fr: 'Stretch manutentionne des colis en entrepôt, notamment lors du déchargement des remorques. Son rôle se distingue du travail d’inspection de Spot.',
  },
  {
    source: 6,
    en: 'Remote exploration is another context for mobile robotics. The official safety and response page presents Boston Dynamics’ approach to this application.',
    fr: 'L’exploration à distance est un autre contexte d’usage de la robotique mobile. La page officielle consacrée à la sécurité et à l’intervention présente l’approche de Boston Dynamics.',
  },
  {
    source: 8,
    en: 'Spot supports research and can carry additional sensors or an arm. The official research page provides context for exploring these extensions.',
    fr: 'Spot sert aussi à la recherche et peut accueillir des capteurs supplémentaires ou un bras. La page officielle de recherche permet d’approfondir ces extensions.',
  },
];

export default function ApplicationsContent() {
  const { locale } = usePreferences();
  const fr = locale === 'fr';
  const t = copy[locale];

  return (
    <main id="page-content" className="editorial-page">
      <header>
        <p className="page-kicker">03 / {fr ? 'SUR LE TERRAIN' : 'IN THE FIELD'}</p>
        <h1 className="page-title">Applications</h1>
        <p className="page-intro">{fr ? 'Des besoins différents, des plateformes différentes. De la collecte de données à la manutention, cinq pistes pour découvrir les usages de la robotique.' : 'Different needs, different platforms. From data collection to material handling, five starting points for exploring robotics at work.'}</p>
      </header>
      <div className="page-section">
        {applications.map((application, index) => {
          const source = t.officialLinks[application.source];
          return (
            <article className="editorial-card" key={application.source}>
              <p className="card-number">0{index + 1}</p>
              <h2 className="section-heading">{source.label}</h2>
              <p>{application[locale]}</p>
              <a className="text-link" href={source.url} target="_blank" rel="noreferrer">{fr ? 'Approfondir sur le site officiel' : 'Explore the official application'} <span aria-hidden="true">↗</span></a>
            </article>
          );
        })}
      </div>
      <p className="source-note">{fr ? 'Synthèses éditoriales indépendantes. Les liens renvoient aux informations officielles de Boston Dynamics ; cette traduction française est propre au projet.' : 'Independent editorial summaries. Links lead to official Boston Dynamics information; the French translation belongs to this project.'}</p>
    </main>
  );
}
