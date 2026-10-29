'use client';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, MoveUpRight, Pause, Play } from 'lucide-react';
import { copy } from '@/lib/copy';
import { usePreferences } from './preferences';
import { ArrivalLoader } from './arrival-loader';
import { chapters, initialSceneState } from '@/lib/story';
const Scene = dynamic(() => import('./scene'), { ssr: false });

class CanvasBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function LoadingStatus() {
  const { active, progress, errors } = useProgress();
  const { locale } = usePreferences();
  const t = copy[locale].ui;
  return <div className="load-status" role="status" aria-live="polite">
    {errors.length ? t.assetError : active ? `${t.loading} / ${Math.round(progress)}%` : t.interactive}
  </div>;
}
export default function Experience() {
  const { locale } = usePreferences();
  const t = copy[locale];
  const root = useRef<HTMLDivElement>(null);
  const story = useRef({ ...initialSceneState });
  const progressLine = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [arrivalDismissed, setArrivalDismissed] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);
  const dismissArrival = useCallback(() => setArrivalDismissed(true), []);
  const [activeChapter, setActiveChapter] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [viewportVersion, setViewportVersion] = useState(0);
  const onSceneError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const probe = document.createElement('canvas');
    const supported = Boolean(probe.getContext('webgl2'));
    // Defer React state updates outside effect setup; release the probe context.
    const context = probe.getContext('webgl2');
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    const frame = requestAnimationFrame(() => setWebgl(supported));
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { setSystemReduced(media.matches); };
    const preferenceFrame = requestAnimationFrame(sync);
    media.addEventListener('change', sync);
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(preferenceFrame); media.removeEventListener('change', sync); };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resize = () => { clearTimeout(timer); timer = setTimeout(() => setViewportVersion((value) => value + 1), 200); };
    window.addEventListener('resize', resize, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = systemReduced || motionPaused;
    story.current.reducedMotion = reduced;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = reduced ? 'auto' : '';
    story.current.pointerX = 0;
    story.current.pointerY = 0;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: reduced ? true : 0.8,
        onUpdate: (trigger) => { if (progressLine.current) progressLine.current.style.transform = `scaleX(${trigger.progress})`; },
      } });
      const distance = Math.max(1, root.current!.scrollHeight - innerHeight);
      const stops = [
        { selector: '#awakening', progress: 0 },
        { selector: '#evolution', progress: 1 },
        { selector: '#atlas', progress: 2 },
        { selector: '#beyond', progress: 3 },
        { selector: '.beyond-second', progress: 3.5 },
        { selector: '#frontier', progress: 4 },
      ];
      let previous = 0;
      stops.slice(1).forEach((stop) => {
        const element = root.current!.querySelector<HTMLElement>(stop.selector)!;
        const offset = Math.min(distance, element.getBoundingClientRect().top + scrollY);
        timeline.to(story.current, { progress: stop.progress, ease: 'none', duration: Math.max(1, offset - previous) });
        previous = offset;
      });
      timeline.to(story.current, { progress: 4, duration: Math.max(1, distance - previous), ease: 'none' });
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>('.chapter:not(:first-child) .chapter-copy').forEach((element) => {
          gsap.fromTo(element, { opacity: 0.15, y: 28 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: element, start: 'top 90%', end: 'top 55%', scrub: true } });
        });
      }
    }, root);
    const pointer = (event: PointerEvent) => {
      if (reduced || event.pointerType !== 'mouse') return;
      story.current.pointerX = (event.clientX / innerWidth - 0.5) * 2;
      story.current.pointerY = -(event.clientY / innerHeight - 0.5) * 2;
    };
    const reset = () => { story.current.pointerX = 0; story.current.pointerY = 0; };
    window.addEventListener('pointermove', pointer, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => { document.documentElement.style.scrollBehavior = previousScrollBehavior; context.revert(); window.removeEventListener('pointermove', pointer); document.removeEventListener('pointerleave', reset); };
  }, [motionPaused, systemReduced, viewportVersion, locale]);

  useEffect(() => {
    const sections = root.current?.querySelectorAll<HTMLElement>('.chapter');
    if (!sections) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveChapter(Number((entry.target as HTMLElement).dataset.chapter)); });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <>
    {!arrivalDismissed && <ArrivalLoader ready={sceneReady || failed || webgl === false} onDismiss={dismissArrival} />}
    <div inert={webgl !== null && !arrivalDismissed ? true : undefined} ref={root} className="experience" data-scene={webgl && !failed ? 'enabled' : 'fallback'}>
      <div className="scene-backdrop" aria-hidden="true" />
      <div className="canvas-layer" aria-hidden="true">
        {webgl && !failed && <CanvasBoundary onError={onSceneError}><Scene story={story} onError={onSceneError} onReady={onSceneReady} /></CanvasBoundary>}
      </div>
      <div className="scene-vignette" aria-hidden="true" />
      <nav className="chapter-nav" aria-label={t.ui.chapters}>
        {chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-label={`${String(i + 1).padStart(2, '0')}: ${t.chapters[i]}`} aria-current={activeChapter === i ? 'step' : undefined}><span className="nav-label">{t.chapters[i]}</span><span className="nav-number">0{i + 1}</span><span className="nav-tick" /></a>)}
      </nav>
      <main id="story">
        <section id="awakening" className="chapter hero" data-chapter="0" aria-labelledby="hero-title">
          <div className="chapter-copy">
            <p className="eyebrow"><span className="tiny-cross">+</span> {t.hero.eyebrow}</p>
            <h1 id="hero-title">{t.hero.titleTop}<br /><span className="title-outline">{t.hero.titleOutline}</span> {t.hero.titleBottom}<span className="signal">.</span></h1>
            <div className="hero-caption"><span className="small-rule" /><p>{t.hero.caption}<br /><span>{t.hero.captionSecondary}</span></p></div>
            <a className="explore-link" href="#evolution"><span className="circle-arrow"><ArrowDown size={17} /></span><span>{t.hero.scroll}</span><span className="explore-line" /></a>
          </div>
          <div className="specimen-label"><span className="signal">01 / SPOT</span><span>{t.hero.descriptor}</span></div>
          <div className="chapter-bottom"><span>{t.chapters[0]}</span><span>{t.hero.bottom} <MoveUpRight size={12} /></span></div>
        </section>
        <section id="evolution" className="chapter" data-chapter="1" aria-labelledby="evolution-title">
          <div className="chapter-copy narrow"><p className="eyebrow">{t.evolution.eyebrow}</p><h2 id="evolution-title">{t.evolution.titleTop}<br /><span className="muted">{t.evolution.titleBottom}</span></h2><p className="body-copy">{t.evolution.body}</p><p className="annotation">{t.evolution.annotation}</p><a className="official-source" href="https://bostondynamics.com/products/spot/">{t.footer.sourceLinkLabel} / Spot <ArrowUpRight size={13} /></a></div>
        </section>
        <section id="atlas" className="chapter" data-chapter="2" aria-labelledby="atlas-title">
          <div className="chapter-copy narrow"><p className="eyebrow">{t.atlas.eyebrow}</p><h2 id="atlas-title">{t.atlas.titleTop}<br /><span className="title-outline">{t.atlas.titleBottom}</span></h2><p className="body-copy">{t.atlas.body}</p><div className="technical-label"><span className="status-dot" /> {t.atlas.tag}</div><p className="annotation">{t.atlas.annotation}</p><a className="official-source" href="https://bostondynamics.com/products/atlas/">{t.footer.sourceLinkLabel} / Atlas <ArrowUpRight size={13} /></a></div>
        </section>
        <section id="beyond" className="chapter beyond" data-chapter="3" aria-labelledby="beyond-title">
          <div className="beyond-panel"><div className="chapter-copy narrow"><p className="eyebrow">{t.beyond.eyebrow}</p><h2 id="beyond-title">{t.beyond.titleTop}<br /><span className="muted">{t.beyond.titleBottom}</span></h2><p className="body-copy">{t.beyond.body}</p><div className="study-notes">{t.beyond.notes.map((note, i) => <span key={i}>0{i + 1} <b>{note}</b></span>)}</div></div></div>
          <div className="beyond-panel beyond-second"><div className="chapter-copy narrow"><p className="eyebrow">{t.beyond.secondEyebrow}</p><h2>{t.beyond.secondTop}<br /><span className="muted">{t.beyond.secondBottom}</span></h2><p className="body-copy">{t.beyond.secondBody}</p><a className="official-source" href="https://bostondynamics.com/">{t.footer.sourceLinkLabel} <ArrowUpRight size={13} /></a></div></div>
        </section>
        <section id="frontier" className="chapter finale" data-chapter="4" aria-labelledby="frontier-title">
          <div className="chapter-copy"><p className="eyebrow">{t.frontier.eyebrow}</p><h2 id="frontier-title">{t.frontier.titleTop}<br /><span className="title-outline">{t.frontier.titleBottom}</span></h2><p className="body-copy">{t.frontier.body}</p><a href="#awakening" className="replay-link">{t.frontier.replay} <ArrowUpRight size={16} /></a></div>
          <footer>
            <p>{t.footer.intro}</p><p>{t.footer.disclaimer}</p><p>{t.footer.companion}</p>
            <details className="official-directory"><summary>{t.footer.sourceLabel} <span>+</span></summary><div className="official-links">{t.officialLinks.map((link) => <a key={link.url} href={link.url}>{link.label} <ArrowUpRight size={12} /></a>)}</div></details>
            <details><summary>{t.ui.credits} <span>+</span></summary><div className="credits"><a href="https://sketchfab.com/3d-models/spotboston-dynamic-high-poly-058b16a8c88047e18b1f081e0d15f883">Spot: Julliani</a><a href="https://sketchfab.com/3d-models/atlas-robot-scan-5ebf41a891e849469fe6b2503b2255f3">Atlas: Idmenthal</a><a href="https://sketchfab.com/3d-models/drone-robot-177e6cce2ef44a679238552a5bf6c956">Drone: noortjeschuur</a><a href="https://creativecommons.org/licenses/by/4.0/">{t.footer.license}</a></div></details>
          </footer>
        </section>
      </main>
      <aside className="experience-toolbar" aria-label={t.ui.controls}>
        <span className="current-chapter">0{activeChapter + 1} <span>/ 05</span></span><span className="toolbar-divider" />
        <button type="button" onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused || systemReduced} disabled={systemReduced} aria-label={systemReduced ? t.ui.systemReduced : motionPaused ? t.ui.resume : t.ui.reduce}>{motionPaused || systemReduced ? <Play size={12} /> : <Pause size={12} />}<span>{motionPaused || systemReduced ? t.ui.motionReduced : t.ui.motionOn}</span></button>
      </aside>
      {failed || webgl === false ? <p className="load-status" role="status">{t.ui.unavailable}</p> : webgl ? <LoadingStatus /> : <p className="load-status" role="status">{t.ui.loading}</p>}
      <div className="progress-track" aria-hidden="true"><div ref={progressLine} /></div>
      <noscript><style>{`.arrival-loader { display: none; }`}</style><p className="load-status">{t.ui.noJs}</p></noscript>
    </div>
  </>;
}
