import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  outdir: 'build',
  bundle: true,
  minify: false,
  splitting: true,
  format: 'esm',
  target: ['esnext'],
  platform: 'node',
  sourcemap: true,
  treeShaking: true,
  outExtension: { '.js': '.mjs' }, 
}).catch(() => process.exit(1));
