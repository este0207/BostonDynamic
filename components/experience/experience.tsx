'use client';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, MoveUpRight, Pause, Play } from 'lucide-react';
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
  return <div className="load-status" role="status" aria-live="polite">
    {errors.length ? 'Some 3D assets could not load. The story remains available.' : active ? `Preparing the scene / ${Math.round(progress)}%` : 'Interactive 3D study'}
  </div>;
}
export default function Experience() {
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
  }, [motionPaused, systemReduced, viewportVersion]);

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
    <a className="skip-link" href="#story">Skip to the story</a>
    <div className="scene-backdrop" aria-hidden="true" />
    <div className="canvas-layer" aria-hidden="true">
      {webgl && !failed && <CanvasBoundary onError={onSceneError}><Scene story={story} onError={onSceneError} onReady={onSceneReady} /></CanvasBoundary>}
    </div>
    <div className="scene-vignette" aria-hidden="true" />
    <header className="site-header">
      <a href="#awakening" className="wordmark" aria-label="The Evolution of Motion, back to beginning"><span className="brand-symbol" aria-hidden="true">✳</span><span>EVOLUTION<br />OF MOTION<span className="wordmark-dot">.</span></span></a>
      <div className="header-meta"><span className="status-dot" /> INDEPENDENT ROBOTICS STUDY <span className="edition">/ VOL. 001</span></div>
      <a href="#frontier" className="index-link">THE EXPLORATION <ArrowUpRight size={14} /></a>
    </header>
    <nav className="chapter-nav" aria-label="Chapters">
      {chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-label={`${String(i + 1).padStart(2, '0')}: ${chapter.label}`} aria-current={activeChapter === i ? 'step' : undefined}><span className="nav-label">{chapter.label}</span><span className="nav-number">0{i + 1}</span><span className="nav-tick" /></a>)}
    </nav>
    <main id="story">
      <section id="awakening" className="chapter hero" data-chapter="0" aria-labelledby="hero-title">
        <div className="chapter-copy">
          <p className="eyebrow"><span className="tiny-cross">+</span> A STUDY IN ENGINEERED POSSIBILITY</p>
          <h1 id="hero-title">THE EVOLUTION<br /><span className="title-outline">OF</span> MOTION<span className="signal">.</span></h1>
          <div className="hero-caption"><span className="small-rule" /><p>Engineering the impossible.<br /><span>One movement at a time.</span></p></div>
          <a className="explore-link" href="#evolution"><span className="circle-arrow"><ArrowDown size={17} /></span><span>SCROLL TO EXPLORE</span><span className="explore-line" /></a>
        </div>
        <div className="specimen-label"><span className="signal">01 / SPOT</span><span>QUADRUPED ROBOT<br />FORM FOLLOWS MOVEMENT</span></div>
        <div className="chapter-bottom"><span>THE AWAKENING</span><span>SCROLL-DRIVEN EXPERIENCE <MoveUpRight size={12} /></span></div>
      </section>
      <section id="evolution" className="chapter" data-chapter="1" aria-labelledby="evolution-title">
        <div className="chapter-copy narrow"><p className="eyebrow">02 / FROM FOUR TO TWO</p><h2 id="evolution-title">FROM INSTINCT<br />TO <span className="muted">INTELLIGENCE.</span></h2><p className="body-copy">A different stance.<br />A new relationship with the world.</p><p className="annotation">An artistic journey from quadruped to humanoid.<br />Not a direct evolutionary lineage.</p></div>
      </section>
      <section id="atlas" className="chapter" data-chapter="2" aria-labelledby="atlas-title">
        <div className="chapter-copy narrow"><p className="eyebrow">03 / THE HUMANOID</p><h2 id="atlas-title">MEET<br /><span className="title-outline">ATLAS.</span></h2><p className="body-copy">An exploration of balance.<br />A study of human form, reimagined.</p><div className="technical-label"><span className="status-dot" /> ATLAS / 3D SCAN STUDY</div></div>
      </section>
      <section id="beyond" className="chapter beyond" data-chapter="3" aria-labelledby="beyond-title">
        <div className="beyond-panel"><div className="chapter-copy narrow"><p className="eyebrow">04 / THE LANGUAGE OF MOVEMENT</p><h2 id="beyond-title">BUILT TO<br />GO <span className="muted">BEYOND.</span></h2><p className="body-copy">Precision. Balance. Intelligence.<br />The future of robotics is already in motion.</p><div className="study-notes"><span>01 <b>MECHANICAL FORM</b></span><span>02 <b>SPATIAL PRESENCE</b></span><span>03 <b>ENGINEERED MOTION</b></span></div></div></div>
        <div className="beyond-panel beyond-second"><div className="chapter-copy narrow"><p className="eyebrow">04 / A DIFFERENT PERSPECTIVE</p><h2>EVERY DETAIL.<br /><span className="muted">IN BALANCE.</span></h2><p className="body-copy">Change the perspective.<br />Discover the form behind the movement.</p></div></div>
      </section>
      <section id="frontier" className="chapter finale" data-chapter="4" aria-labelledby="frontier-title">
        <div className="chapter-copy"><p className="eyebrow">05 / AN OPEN QUESTION</p><h2 id="frontier-title">THE NEXT<br /><span className="title-outline">FRONTIER.</span></h2><p className="body-copy">Where do we go from here?</p><a href="#awakening" className="replay-link">EXPERIENCE AGAIN <ArrowUpRight size={16} /></a></div>
        <footer><p>AN INDEPENDENT EXPERIMENT IN MOTION.</p><p>Unofficial concept, not affiliated with Boston Dynamics.</p><details><summary>3D model credits <span>+</span></summary><div className="credits"><a href="https://sketchfab.com/3d-models/spotboston-dynamic-high-poly-058b16a8c88047e18b1f081e0d15f883">Spot: Julliani</a><a href="https://sketchfab.com/3d-models/atlas-robot-scan-5ebf41a891e849469fe6b2503b2255f3">Atlas: Idmenthal</a><a href="https://sketchfab.com/3d-models/drone-robot-177e6cce2ef44a679238552a5bf6c956">Drone: noortjeschuur</a><a href="https://creativecommons.org/licenses/by/4.0/">All models: CC BY 4.0. Scaled and staged for this study.</a></div></details></footer>
      </section>
    </main>
    <aside className="experience-toolbar" aria-label="Experience controls">
      <span className="current-chapter">0{activeChapter + 1} <span>/ 05</span></span>
      <span className="toolbar-divider" />
      <button type="button" onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused || systemReduced} disabled={systemReduced} aria-label={systemReduced ? 'Reduced motion follows your system preference' : motionPaused ? 'Resume cinematic motion' : 'Reduce cinematic motion'}>{motionPaused || systemReduced ? <Play size={12} /> : <Pause size={12} />}<span>{motionPaused || systemReduced ? 'REDUCED MOTION' : 'MOTION ON'}</span></button>
    </aside>
    {failed || webgl === false ? <p className="load-status" role="status">3D unavailable. Continue exploring the story.</p> : webgl ? <LoadingStatus /> : <p className="load-status" role="status">Preparing the experience</p>}
    <div className="progress-track" aria-hidden="true"><div ref={progressLine} /></div>
    <noscript><style>{`.arrival-loader { display: none; }`}</style><p className="load-status">The story is available below. Enable JavaScript for interactive 3D.</p></noscript>
  </div></>;
}
