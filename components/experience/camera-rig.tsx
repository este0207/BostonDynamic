'use client';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { useMemo, type RefObject } from 'react';
import { sample, type SceneState } from '@/lib/story';
export function CameraRig({ story }: { story: RefObject<SceneState> }) {
  const target = useMemo(() => new Vector3(), []);
  useFrame(({ camera, size }, delta) => {
    const s = story.current;
    const mobile = size.width < 760;
    const p = s.reducedMotion ? Math.round(s.progress * 2) / 2 : s.progress;
    const z = mobile ? 10.5 : sample(p * 2, [8.4, 8.4, 8.8, 4.7, 6.6, 8.8, 8.8, 8.8, 10]);
    const damp = s.reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 5);
    camera.position.x = MathUtils.lerp(camera.position.x, s.pointerX * 0.18, damp);
    camera.position.y = MathUtils.lerp(camera.position.y, (mobile ? 0.4 : 0.25) + s.pointerY * 0.1, damp);
    camera.position.z = MathUtils.lerp(camera.position.z, z, damp);
    target.set(0, mobile ? 0.15 : sample(p * 2, [0, 0, 0.2, 1.2, 0.55, 0, 0, 0, 0]), 0);
    camera.lookAt(target);
  });
  return null;
}
