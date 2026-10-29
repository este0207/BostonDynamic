'use client';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';

export function ArrivalLoader({ ready, onDismiss }: { ready: boolean; onDismiss: () => void }) {
  const { progress } = useProgress();
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

  return <div ref={panel} className="arrival-loader" data-leaving={leaving} role="dialog" onKeyDown={(event) => { if (event.key === 'Escape') onDismiss(); if (event.key === 'Tab') { event.preventDefault(); skip.current?.focus(); } }} aria-modal="true" aria-labelledby="arrival-title">
    <div className="arrival-header"><span>EVOLUTION OF MOTION<span className="signal">.</span></span><span>VOL. 001 / INITIALIZATION</span></div>
    <div className="arrival-center">
      <div className="arrival-emblem" aria-hidden="true"><span /><span /><span /><i>+</i></div>
      <p className="eyebrow">{ready ? 'SYSTEM READY' : 'ESTABLISHING CONNECTION'}</p>
      <h2 id="arrival-title">MOTION<br /><span className="title-outline">IS LOADING.</span></h2>
      <div className="arrival-progress" role="progressbar" aria-label="Preparing 3D models" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
        <span style={{ transform: `scaleX(${percentage / 100})` }} />
      </div>
      <div className="arrival-readout"><span>{ready ? 'SCENE CALIBRATED' : 'PREPARING MODELS & MATERIALS'}</span><span>{String(percentage).padStart(3, '0')}<span className="signal">%</span></span></div>
      <p className="arrival-note">A moment to bring the machinery to life.</p>
    </div>
    <div className="arrival-footer"><span><span className="status-dot" /> {ready ? 'READY TO EXPLORE' : 'SYSTEM INITIALIZING'}</span><button ref={skip} type="button" onClick={onDismiss}>CONTINUE WITHOUT WAITING <span aria-hidden="true">↗</span></button></div>
  </div>;
}
