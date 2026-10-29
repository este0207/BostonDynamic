'use client';
import { Environment, Lightformer } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import type { DirectionalLight } from 'three';
import { sample, type SceneState } from '@/lib/story';
export function Lighting({ story }: { story: RefObject<SceneState> }) {
  const key = useRef<DirectionalLight>(null);
  useFrame(() => {
    if (key.current) key.current.intensity = sample(story.current.progress, [3.5, 2, 4.5, 3.5, 0.5]);
  });
  return <>
    <ambientLight intensity={0.35} />
    <directionalLight ref={key} position={[3, 5, 4]} intensity={3.5} color="#e2eaf1" />
    <directionalLight position={[-4, 2, -2]} intensity={5} color="#a6b9cf" />
    <pointLight position={[4, 0, 2]} intensity={12} color="#e6a348" distance={10} />
    <Environment resolution={128}>
      <Lightformer intensity={3} position={[0, 4, 2]} scale={[6, 2, 1]} />
      <Lightformer intensity={4} position={[-4, 1, -1]} rotation={[0, Math.PI / 2, 0]} scale={[2, 5, 1]} />
      <Lightformer intensity={1} color="#e6a348" position={[4, 2, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 4, 1]} />
    </Environment>
  </>;
}
