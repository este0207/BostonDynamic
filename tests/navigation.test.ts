import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { navigation } from '../lib/navigation.ts';
import { robots, getRobot } from '../lib/robots.ts';

test('every main navigation destination has a real App Router page and both labels', () => {
  assert.equal(new Set(navigation.map(({href}) => href)).size, 4);
  for (const item of navigation) {
    assert.ok(existsSync(`app${item.href === '/' ? '' : item.href}/page.tsx`), item.href);
    assert.ok(item.en.trim() && item.fr.trim());
  }
});
test('robot routes resolve available assets and reject unknown products', () => {
  assert.equal(getRobot('unknown'), undefined);
  assert.equal(new Set(robots.map(({slug}) => slug)).size, robots.length);
  for (const robot of robots) {
    assert.equal(getRobot(robot.slug), robot);
    if (robot.model) assert.ok(existsSync(`public${robot.model}`), robot.model);
    assert.equal(new URL(robot.source).hostname, 'bostondynamics.com');
    assert.deepEqual(Object.keys(robot.text.en).sort(), Object.keys(robot.text.fr).sort());
  }
  assert.equal(getRobot('stretch')?.model, undefined);
  assert.ok(getRobot('atlas')?.text.fr.note?.includes('historique'));
});
