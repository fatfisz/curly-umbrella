import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const productionPlugins = [
  uglify({ toplevel: true }, minify),
];

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'lib/index.js',
  plugins: [
    commonjs(),
    nodeResolve(),
    babel(),
    ...(process.env.NODE_ENV === 'production' ? productionPlugins : []),
  ],
  interop: false,
};
