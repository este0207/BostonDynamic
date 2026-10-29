'use client';

import Link from 'next/link';
import { usePreferences } from '@/components/experience/preferences';
import { RobotViewer } from '@/components/pages/robot-viewer';
import type { Robot } from '@/lib/robots';

export function RobotDetail({ robot }: { robot: Robot }) {
  const { locale } = usePreferences();
  const fr = locale === 'fr';
  const content = robot.text[locale];
  return (
    <main id="page-content" className="editorial-page">
      <Link className="text-link" href="/robots">← {fr ? 'Tous les robots' : 'All robots'}</Link>
      <p className="page-kicker">{content.category}</p>
      <h1 className="page-title">{robot.name}.</h1>
      <p className="page-intro">{content.summary}</p>
      <div className="detail-layout">
        <div className="detail-copy">
          <h2 className="section-heading">{fr ? 'Son rôle' : 'Its role'}</h2>
          <p>{content.description}</p>
          <h2>{fr ? 'Applications' : 'Applications'}</h2>
          <ul className="spec-list">{content.applications.map((item) => <li key={item}>{item}</li>)}</ul>
          <a className="text-link" href={robot.source}>{fr ? 'Informations produit officielles' : 'Official product information'} <span aria-hidden="true">↗</span></a>
        </div>
        {robot.model && <div>
          <RobotViewer url={robot.model} name={robot.name} height={2.8} finish={robot.finish} />
          {content.note && <p className="source-note">{content.note}</p>}
        </div>}
      </div>
      {!robot.model && content.note && <p className="source-note">{content.note}</p>}
    </main>
  );
}
