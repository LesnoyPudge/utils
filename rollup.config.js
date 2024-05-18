import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import {dts} from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'build/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      alias({
        entries: [
          { find: '@root', replacement: __dirname + '/src' } // Replace with the correct path
        ]
      })
    ],
    external: [], // Specify external dependencies here
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'build/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];