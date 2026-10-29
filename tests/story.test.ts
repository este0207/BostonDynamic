import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, sample } from '../lib/story.ts';

test('chapter anchors are unique and map to the five scene stops', () => {
  assert.equal(chapters.length, 5);
  assert.equal(new Set(chapters.map((chapter) => chapter.id)).size, 5);
  assert.equal(chapters[0].id, 'awakening');
  assert.equal(chapters[4].id, 'frontier');
});
test('scroll is clamped at either end of the narrative', () => {
  assert.equal(sample(-10, [8, 6, 4, 7, 10]), 8);
  assert.equal(sample(20, [8, 6, 4, 7, 10]), 10);
});
test('reversing scroll returns exactly to earlier camera positions', () => {
  const positions = [8.4, 8.8, 6.6, 8.8, 10];
  const steps = [0, 0.1, 0.9, 1, 1.75, 2, 2.8, 3, 3.5, 4];
  const forward = steps.map((p) => sample(p, positions));
  const backward = [...steps].reverse().map((p) => sample(p, positions)).reverse();
  assert.deepEqual(forward, backward);
  positions.forEach((position, i) => assert.equal(sample(i, positions), position));
});
test('transitions are continuous around chapter boundaries', () => {
  const positions = [1.65, 2.1, 9, 9, 9];
  for (const boundary of [1, 2, 3]) {
    assert.ok(Math.abs(sample(boundary - 0.001, positions) - sample(boundary + 0.001, positions)) < 0.001);
  }
});
