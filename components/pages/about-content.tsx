'use client';

import { usePreferences } from '@/components/experience/preferences';
import { copy } from '@/lib/copy';

const credits = [
  { title: 'Spot (Boston Dynamic) High Poly', author: 'Julliani', url: 'https://sketchfab.com/3d-models/spotboston-dynamic-high-poly-058b16a8c88047e18b1f081e0d15f883' },
  { title: 'Atlas Robot #scan', author: 'Idmenthal', url: 'https://sketchfab.com/3d-models/atlas-robot-scan-5ebf41a891e849469fe6b2503b2255f3' },
  { title: 'drone robot', author: 'noortjeschuur', url: 'https://sketchfab.com/3d-models/drone-robot-177e6cce2ef44a679238552a5bf6c956' },
];

export default function AboutContent() {
  const { locale } = usePreferences();
  const fr = locale === 'fr';
  const t = copy[locale];

  return (
    <main id="page-content" className="editorial-page">
      <header>
        <p className="page-kicker">04 / {fr ? 'NOTES DE PROJET' : 'PROJECT NOTES'}</p>
        <h1 className="page-title">{fr ? 'À propos' : 'About'}</h1>
        <p className="page-intro">{fr ? 'Une étude personnelle de direction artistique, de développement front-end et de narration WebGL autour des formes robotiques et du mouvement.' : 'A personal study in art direction, front-end development and WebGL storytelling, exploring robotic forms and motion.'}</p>
        <p className="source-note">{t.footer.disclaimer}</p>
      </header>

      <div className="about-columns page-section">
        <section aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="section-heading">{fr ? 'L’approche' : 'The approach'}</h2>
          <p>{fr ? 'La composition, la lumière et le défilement mettent en scène les modèles comme une exploration artistique. Le rapprochement de Spot et d’Atlas ne représente pas une lignée évolutive scientifique.' : 'Composition, light and scrolling stage the models as an artistic exploration. The comparison between Spot and Atlas does not represent a scientific evolutionary lineage.'}</p>
          <p>{fr ? 'Le drone est un guide visuel indépendant, sans dialogue ni fonction d’IA. Ce n’est pas un produit Boston Dynamics.' : 'The drone is an independent visual guide, with no dialogue or AI functionality. It is not a Boston Dynamics product.'}</p>
          <p>{fr ? 'Les déplacements concernent les modèles complets et la caméra. Les fichiers fournis ne contiennent pas de clips d’animation : la marche articulée n’est pas simulée.' : 'Motion applies to whole models and the camera. The supplied files contain no animation clips: articulated walking is not simulated.'}</p>
        </section>
        <section aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="section-heading">{fr ? 'La réalisation' : 'The implementation'}</h2>
          <dl className="spec-list">
            <div><dt>Front-end</dt><dd>Next.js 16 · React 19 · TypeScript</dd></div>
            <div><dt>WebGL</dt><dd>Three.js · React Three Fiber · Drei</dd></div>
            <div><dt>{fr ? 'Mouvement' : 'Motion'}</dt><dd>GSAP · CSS</dd></div>
            <div><dt>{fr ? 'Interface' : 'Interface'}</dt><dd>Tailwind CSS 4 · Lucide React</dd></div>
            <div><dt>{fr ? 'Modèles' : 'Models'}</dt><dd>glTF Transform · Meshopt · GLB</dd></div>
          </dl>
          <p>{fr ? 'Le contenu HTML reste accessible sans WebGL. Les préférences de langue, de thème et de mouvement accompagnent l’expérience.' : 'HTML content remains accessible without WebGL. Language, theme and motion preferences accompany the experience.'}</p>
        </section>
      </div>

      <section className="page-section" aria-labelledby="sources-heading">
        <p className="page-kicker">{fr ? 'CONTEXTE ÉDITORIAL' : 'EDITORIAL CONTEXT'}</p>
        <h2 id="sources-heading" className="section-heading">{fr ? 'Distinguer le modèle du produit' : 'Distinguishing the model from the product'}</h2>
        <p>{t.atlas.annotation}</p>
        <p>{fr ? 'Les descriptions des robots synthétisent les pages officielles de Spot, Atlas, Stretch et Orbit. Les textes français sont des traductions propres au projet, sans statut officiel.' : 'Robot descriptions summarize the official Spot, Atlas, Stretch and Orbit pages. French texts are project translations and are not official translations.'}</p>
        <div className="editorial-grid">
          {t.officialLinks.slice(0, 4).map((source) => <a className="text-link" href={source.url} key={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>)}
        </div>
      </section>

      <section id="credits" className="page-section" aria-labelledby="credits-heading">
        <p className="page-kicker">{fr ? 'PROVENANCE DES ASSETS' : 'ASSET PROVENANCE'}</p>
        <h2 id="credits-heading" className="section-heading">{t.ui.credits}</h2>
        <p>{fr ? 'Auteurs et licences déclarés dans les métadonnées des GLB fournis. Ces crédits ne constituent pas une preuve d’affiliation officielle.' : 'Authors and licences declared in the supplied GLB metadata. These credits do not establish any official affiliation.'}</p>
        <div className="editorial-grid">
          {credits.map((credit) => (
            <article className="editorial-card" key={credit.url}>
              <h3>{credit.title}</h3>
              <p>{fr ? 'Par' : 'By'} {credit.author}</p>
              <p><a className="text-link" href={credit.url} target="_blank" rel="noreferrer">Sketchfab <span aria-hidden="true">↗</span></a></p>
              <a className="text-link" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0 <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="source-note">{fr ? 'Adaptations : échelle, cadrage, éclairage, déplacements et rotations. Le matériau acier d’Atlas a été créé pour cette mise en scène. Les versions web sont dédupliquées, quantifiées et compressées avec Meshopt ; les originaux sont conservés.' : 'Adaptations: scale, framing, lighting, movement and rotation. Atlas’ steel material was created for this staging. Web versions are deduplicated, quantized and compressed with Meshopt; the originals are preserved.'}</p>
      </section>
    </main>
  );
}
