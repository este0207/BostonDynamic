'use client';

import Link from 'next/link';
import { usePreferences } from '@/components/experience/preferences';
import { robots } from '@/lib/robots';

export function RobotsContent() {
  const { locale } = usePreferences();
  const fr = locale === 'fr';
  return (
    <main id="page-content" className="editorial-page">
      <p className="page-kicker">01 / {fr ? 'LES PLATEFORMES' : 'THE PLATFORMS'}</p>
      <h1 className="page-title">Robots.</h1>
      <p className="page-intro">{fr ? 'Trois formes, trois missions. Découvrez les plateformes et les usages qui les distinguent.' : 'Three forms, three missions. Explore the platforms and the work that defines them.'}</p>
      <div className="editorial-grid">
        {robots.map((robot, index) => <article className="editorial-card" key={robot.slug}>
          <p className="card-number">0{index + 1} / {robot.text[locale].category}</p>
          <h2>{robot.name}</h2>
          <p>{robot.text[locale].summary}</p>
          <Link className="text-link" href={`/robots/${robot.slug}`}>{fr ? 'Découvrir' : 'Explore'} {robot.name} <span aria-hidden="true">↗</span></Link>
        </article>)}
      </div>
      <section className="page-section">
        <p className="page-kicker">{fr ? 'LE LOGICIEL' : 'THE SOFTWARE'}</p>
        <h2 className="section-heading">Orbit.</h2>
        <p>{fr ? 'Orbit réunit la supervision des flottes robotiques et les données d’inspection dans un logiciel dédié.' : 'Orbit brings robot fleet supervision and inspection data together in a dedicated software platform.'}</p>
        <a className="text-link" href="https://bostondynamics.com/products/orbit/">{fr ? 'Orbit sur le site officiel' : 'Orbit on the official website'} <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
