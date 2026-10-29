'use client';
import { Suspense, useRef, Component, type ReactNode, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3, type Group } from 'three';
import { Robot } from './robot';
import { Lighting } from './lighting';
import { CameraRig } from './camera-rig';
import { sample, type SceneState } from '@/lib/story';
class AssetBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function Actors({ story, onAssetError }: { story: RefObject<SceneState>; onAssetError: () => void }) {
  const spot = useRef<Group>(null);
  const atlas = useRef<Group>(null);
  const drone = useRef<Group>(null);
  const destination = useRef(new Vector3());
  useFrame(({ clock, size, camera, viewport }, delta) => {
    const s = story.current;
    const p = s.reducedMotion ? Math.round(s.progress * 2) / 2 : s.progress;
    const mobile = size.width < 760;
    const t = s.reducedMotion ? 0 : clock.elapsedTime;
    if (spot.current) {
      spot.current.visible = p < 1.55;
      spot.current.scale.setScalar(mobile ? 0.72 : 1);
      spot.current.position.set(mobile ? sample(p, [0, 0, 8, 8, 8]) : sample(p, [1.95, 2.1, 9, 9, 9]), mobile ? -2.5 : -1.45, 0);
      spot.current.rotation.set(0, sample(p, [-0.65, -0.25, 0.5, 0.5, 0.5]) + Math.sin(t * 0.5) * 0.015, 0);
    }
    if (atlas.current) {
      atlas.current.visible = p > 0.65 && p < 3.9;
      atlas.current.scale.setScalar(mobile ? 0.65 : 1);
      atlas.current.position.set(mobile ? sample(p, [-8, -3, 0, 0, 7]) : sample(p * 2, [-8, -8, -3.5, 0, 1.45, 1.6, 1.8, -1.65, -8]), mobile ? -2.5 : -1.65, sample(p, [0, 0, 1, 0, -1]));
      atlas.current.rotation.y = sample(p, [0.2, 0.2, -0.2, -0.55, -1]);
    }
    if (drone.current) {
      const view = viewport.getCurrentViewport(camera, [0, 0, 1]);
      const x = mobile ? sample(p * 2, [0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0]) : sample(p, [0.37, 0.37, -0.37, 0.37, 0]);
      const y = mobile ? sample(p * 2, [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, -0.22]) : sample(p, [0.34, 0.34, 0.34, 0.34, -0.22]);
      const damping = s.reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 4);
      destination.current.set(view.width * x, view.height * y + Math.sin(t * 1.3) * 0.045, 1);
      drone.current.position.lerp(destination.current, damping);
      drone.current.rotation.y = MathUtils.lerp(drone.current.rotation.y, sample(p, [-0.4, 0.5, -0.6, 0.3, 0]) + s.pointerX * 0.15, damping);
      drone.current.rotation.z = Math.sin(t * 0.7) * 0.025;
      drone.current.scale.setScalar(mobile ? 0.75 : 1);
    }
  });
  return <>
    <group ref={spot}><AssetBoundary onError={onAssetError}><Robot url="/models/spotboston_dynamic_high_poly.web.glb" height={2.25} /></AssetBoundary></group>
    <group ref={atlas} visible={false}><AssetBoundary onError={onAssetError}><Robot url="/models/atlas_robot_scan.web.glb" height={3.3} finish /></AssetBoundary></group>
    <group ref={drone} position={[2, -1, 1]}><AssetBoundary onError={onAssetError}><Robot url="/models/drone_robot.web.glb" height={0.43} /></AssetBoundary></group>
  </>;
}
function ReadyFrame({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    if (++frames.current === 3) onReady();
  });
  return null;
}
function Ground() {
  const mobile = useThree((state) => state.size.width < 760);
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, mobile ? -2.51 : -1.67, 0]}>
    <planeGeometry args={[200, 200]} /><meshStandardMaterial color="#080a0d" roughness={0.65} metalness={0.25} />
  </mesh>;
}
export default function Scene({ story, onError, onReady }: { story: RefObject<SceneState>; onError: () => void; onReady: () => void }) {
  return <Canvas camera={{ position: [0, 0.25, 8.4], fov: 35, near: 0.1, far: 70 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', onError, { once: true }); }}>
    <CameraRig story={story} />
    <Suspense fallback={null}>
      <Lighting story={story} />
      <Actors story={story} onAssetError={onError} />
      <ReadyFrame onReady={onReady} />
    </Suspense>
    <Ground />
    <fog attach="fog" args={['#080a0d', 14, 32]} />
  </Canvas>;
}
