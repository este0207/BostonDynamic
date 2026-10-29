'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, Component, useRef, useState, type ReactNode } from 'react';
import { Environment, Lightformer, OrbitControls, useProgress } from '@react-three/drei';
import { Pause, Play } from 'lucide-react';
import type { Group } from 'three';
import { Robot } from '@/components/experience/robot';
import { usePreferences } from '@/components/experience/preferences';

class ViewerBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function Turntable({ children, paused }: { children: ReactNode; paused: boolean }) {
  const model = useRef<Group>(null);
  const motion = useRef<MediaQueryList | null>(null);
  useFrame((_, delta) => {
    if (!paused && model.current && !(motion.current ??= matchMedia('(prefers-reduced-motion: reduce)')).matches) model.current.rotation.y += Math.min(delta, .1) * .08;
  });
  return <group ref={model} position={[0, -1.45, 0]} rotation={[0, -.45, 0]}>{children}</group>;
}
function Progress({ historical }: {historical: boolean}) {
  const { progress, active } = useProgress();
  const { locale } = usePreferences();
  return <p className="viewer-status" role="status">{active ? `${locale === 'fr' ? 'Chargement' : 'Loading'} / ${Math.floor(progress)}%` : historical ? locale === 'fr' ? 'Modèle 3D · génération historique' : '3D model · historical generation' : locale === 'fr' ? 'Modèle 3D interactif' : 'Interactive 3D model'}</p>;
}
export function RobotViewer({ url, name, height = 2.8, finish = false }: { url: string; name: string; height?: number; finish?: boolean }) {
  const { locale, theme } = usePreferences();
  const [paused, setPaused] = useState(true);
  const unavailable = <p className="viewer-fallback">{locale === 'fr' ? 'La 3D est indisponible. Les informations restent accessibles ci-dessous.' : '3D is unavailable. Product information remains available below.'}</p>;
  return <section className="robot-viewer" aria-label={`${name} / ${locale === 'fr' ? 'exploration 3D' : '3D exploration'}`}>
    <div className="viewer-canvas"><ViewerBoundary fallback={unavailable}>
      <Canvas role="img" aria-label={`${name} / 3D`} dpr={[1, 1.5]} camera={{ position: [4, 1.4, 6], fov: 38 }} gl={{ alpha: true, antialias: true }} fallback={unavailable}>
        <ambientLight intensity={theme === 'light' ? .7 : .4} /><directionalLight position={[4, 5, 3]} intensity={3} /><directionalLight position={[-3, 2, -3]} intensity={3} color="#aac0d5" />
        <Suspense fallback={null}>
          <Environment resolution={128}><Lightformer position={[0, 4, 2]} scale={[5, 3, 1]} intensity={3} /><Lightformer position={[-4, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} intensity={2} /></Environment>
          <Turntable paused={paused}><Robot url={url} height={height} finish={finish} /></Turntable>
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
    </ViewerBoundary></div>
    <div className="viewer-controls"><Progress historical={finish} /><button type="button" aria-pressed={!paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}{locale === 'fr' ? paused ? 'Faire tourner' : 'Arrêter la rotation' : paused ? 'Rotate model' : 'Stop rotation'}</button></div>
    <p className="viewer-hint">{locale === 'fr' ? 'Glissez pour observer le modèle.' : 'Drag to explore the model.'}</p>
  </section>;
}
