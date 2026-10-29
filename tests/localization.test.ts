import test from 'node:test';
import assert from 'node:assert/strict';
import { copy } from '../lib/copy.ts';
import { chapters } from '../lib/story.ts';

function leaves(value: unknown, path = ''): Map<string, string> {
  if (typeof value === 'string') return new Map([[path, value]]);
  return new Map(Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => [...leaves(child, `${path}.${key}`)]));
}
test('both languages cover every visible and accessible content field', () => {
  const english = leaves(copy.en);
  const french = leaves(copy.fr);
  assert.deepEqual([...english.keys()], [...french.keys()]);
  for (const [key, value] of [...english, ...french]) assert.ok(value.trim(), `Empty translation: ${key}`);
  assert.equal(copy.en.chapters.length, chapters.length);
  assert.equal(copy.fr.chapters.length, chapters.length);
  assert.notEqual(copy.en.loader.progressLabel, copy.fr.loader.progressLabel);
  assert.notEqual(copy.en.ui.unavailable, copy.fr.ui.unavailable);
});
test('official source destinations stay identical across languages', () => {
  assert.deepEqual(copy.en.officialLinks.map(({ url }) => url), copy.fr.officialLinks.map(({ url }) => url));
  for (const { url } of copy.en.officialLinks) {
    const source = new URL(url);
    assert.equal(source.protocol, 'https:');
    assert.equal(source.hostname, 'bostondynamics.com');
  }
});
