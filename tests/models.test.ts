import test from 'node:test';
import assert from 'node:assert/strict';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder } from 'meshoptimizer';

test('every compressed model decodes and retains its triangle count', async () => {
  await MeshoptDecoder.ready;
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder });
  for (const name of ['spotboston_dynamic_high_poly', 'atlas_robot_scan', 'drone_robot']) {
    const source = await io.read(`models/${name}.glb`);
    const web = await io.read(`public/models/${name}.web.glb`);
    const count = (document: Awaited<ReturnType<typeof io.read>>) => document.getRoot().listMeshes().reduce((total, mesh) => total + mesh.listPrimitives().reduce((n, primitive) => n + (primitive.getIndices()?.getCount() ?? primitive.getAttribute('POSITION')!.getCount()) / 3, 0), 0);
    assert.equal(count(web), count(source), `${name}: topology must be retained`);
    assert.ok(web.getRoot().listScenes().length > 0, `${name}: scene missing`);
    assert.equal(web.getRoot().listTextures().length, source.getRoot().listTextures().length, `${name}: textures missing`);
  }
});
