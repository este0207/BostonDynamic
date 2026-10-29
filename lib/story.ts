export const chapters = [
  { id: 'awakening', label: 'The awakening', subject: '01 / QUADRUPED' },
  { id: 'evolution', label: 'From four to two', subject: '02 / TRANSITION' },
  { id: 'atlas', label: 'Meet Atlas', subject: '03 / HUMANOID' },
  { id: 'beyond', label: 'Built to go beyond', subject: '04 / MOVEMENT' },
  { id: 'frontier', label: 'The next frontier', subject: '05 / POSSIBILITY' },
] as const;
export type SceneState = { progress: number; reducedMotion: boolean; pointerX: number; pointerY: number };
export const initialSceneState: SceneState = { progress: 0, reducedMotion: false, pointerX: 0, pointerY: 0 };
// Forward and backward scroll follow exactly the same path.
export function sample(progress: number, stops: readonly number[]): number {
  const p = Math.max(0, Math.min(stops.length - 1, progress));
  const index = Math.min(Math.floor(p), stops.length - 2);
  const t = p - index;
  const eased = t * t * (3 - 2 * t);
  return stops[index] + (stops[index + 1] - stops[index]) * eased;
}
