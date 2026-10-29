'use client';
import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3, Mesh, MeshStandardMaterial } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
export function Robot({ url, height, finish = false }: { url: string; height: number; finish?: boolean }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const object = clone(scene);
    const material = finish ? new MeshStandardMaterial({ color: '#71808b', metalness: 0.5, roughness: 0.48 }) : null;
    if (material) object.traverse((node) => { if (node instanceof Mesh) node.material = material; });
    object.updateMatrixWorld(true);
    const box = new Box3().setFromObject(object, true);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = height / Math.max(size.y, 0.001);
    object.scale.multiplyScalar(scale);
    object.position.sub(center.multiplyScalar(scale));
    object.position.y += height / 2;
    return object;
  }, [scene, height, finish]);
  useEffect(() => () => {
    if (!finish) return;
    const materials = new Set<MeshStandardMaterial>();
    model.traverse((node) => { if (node instanceof Mesh && node.material instanceof MeshStandardMaterial) materials.add(node.material); });
    materials.forEach((material) => material.dispose());
  }, [model, finish]);
  return <primitive object={model} dispose={null} />;
}
