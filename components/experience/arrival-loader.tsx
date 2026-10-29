'use client';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { copy } from '@/lib/copy';
import { usePreferences } from './preferences';
import { PreferenceControls } from './preference-controls';

export function ArrivalLoader({ ready, onDismiss }: { ready: boolean; onDismiss: () => void }) {
  const { progress } = useProgress();
  const { locale } = usePreferences();
  const t = copy[locale];
  const [leaving, setLeaving] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const percentage = ready ? 100 : Math.min(99, Math.floor(progress));

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const element = panel.current;
    document.body.style.overflow = 'hidden';
    skip.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element?.contains(document.activeElement) && previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Show completion, then reveal the already-mounted scene without restarting it.
    const reveal = window.setTimeout(() => setLeaving(true), 180);
    const dismiss = window.setTimeout(onDismiss, 460);
    return () => { clearTimeout(reveal); clearTimeout(dismiss); };
  }, [ready, onDismiss]);

  return <div ref={panel} className="arrival-loader" data-leaving={leaving} role="dialog" onKeyDown={(event) => { if (event.key === 'Escape') onDismiss(); if (event.key === 'Tab') {
      const controls = panel.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    } }} aria-modal="true" aria-labelledby="arrival-title">
    <div className="arrival-header"><span>EVOLUTION OF MOTION<span className="signal">.</span></span><span>{t.loader.initialization}</span><PreferenceControls labels={t.ui} /></div>
    <div className="arrival-center">
      <div className="arrival-emblem" aria-hidden="true"><span /><span /><span /><i>+</i></div>
      <p className="eyebrow">{ready ? t.loader.ready : t.loader.connecting}</p>
      <h2 id="arrival-title">{t.loader.titleTop}<br /><span className="title-outline">{t.loader.titleBottom}</span></h2>
      <div className="arrival-progress" role="progressbar" aria-label={t.loader.progressLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
        <span style={{ transform: `scaleX(${percentage / 100})` }} />
      </div>
      <div className="arrival-readout"><span>{ready ? t.loader.calibrated : t.loader.preparing}</span><span>{String(percentage).padStart(3, '0')}<span className="signal">%</span></span></div>
      <p className="arrival-note">{t.loader.note}</p>
    </div>
    <div className="arrival-footer"><span><span className="status-dot" /> {ready ? t.loader.explore : t.loader.initializing}</span><button ref={skip} type="button" onClick={onDismiss}>{t.loader.skip} <span aria-hidden="true">↗</span></button></div>
  </div>;
}
