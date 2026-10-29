import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, meshopt } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import { stat } from 'node:fs/promises';
await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
for (const name of ['spotboston_dynamic_high_poly', 'atlas_robot_scan', 'drone_robot']) {
  const input = `models/${name}.glb`;
  const output = `public/models/${name}.web.glb`;
  const document = await io.read(input);
  await document.transform(dedup(), prune(), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
  await io.write(output, document);
  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  console.log(`${name}: ${(before / 1048576).toFixed(2)} → ${(after / 1048576).toFixed(2)} MiB`);
}
