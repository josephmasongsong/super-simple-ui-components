import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';

export default {
  input: './src/index.ts',
  plugins: [
    terser(),
    typescript({
      sourceMap: true,
    }),
    scss({
      fileName: 'bundle.min.css',
    }),
  ],
  output: [
    {
      file: 'lib/bundle.esm.min.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      name: 'sui',
      file: 'lib/bundle.umd.min.js',
      format: 'umd',
      sourcemap: true,
    },
  ],
};
