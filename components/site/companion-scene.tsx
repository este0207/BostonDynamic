'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, Component, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Group } from 'three';
import { Robot } from '@/components/experience/robot';
import { usePreferences } from '@/components/experience/preferences';
class SilentBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? null : this.props.children; }
}
function Drone({ paused }: {paused: boolean}) {
  const group = useRef<Group>(null);
  const motion = useRef<MediaQueryList | null>(null);
  useFrame(({clock}) => {
    if (!group.current) return;
    const still = paused || (motion.current ??= matchMedia('(prefers-reduced-motion: reduce)')).matches;
    group.current.position.y = -.45 + (still ? 0 : Math.sin(clock.elapsedTime * 1.2) * .04);
    group.current.rotation.y = still ? 0 : Math.sin(clock.elapsedTime * .4) * .2;
  });
  return <group ref={group} position={[0, -.45, 0]}><Robot url="/models/drone_robot.web.glb" height={.9} /></group>;
}
export default function CompanionScene() {
  const {locale} = usePreferences();
  const [paused, setPaused] = useState(false);
  return <><div className="companion-canvas" aria-hidden="true"><SilentBoundary><Canvas camera={{position:[0, 0, 2.8], fov:38}} dpr={[1, 1.5]} gl={{alpha:true}} fallback={null}>
    <ambientLight intensity={1.2} /><directionalLight position={[2, 3, 4]} intensity={2.5} /><Suspense fallback={null}><Drone paused={paused} /></Suspense>
  </Canvas></SilentBoundary></div><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} aria-label={locale === 'fr' ? paused ? 'Animer le compagnon' : 'Mettre le compagnon en pause' : paused ? 'Animate companion' : 'Pause companion'}>{paused ? <Play size={10} /> : <Pause size={10} />}</button></>;
}
