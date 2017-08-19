import path from 'path';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

import wrapper from './rollup-plugin-custom-wrapper';

const productionPlugins = [
  uglify({ toplevel: true }, minify),
];

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'docs/index.html',
  plugins: [
    commonjs(),
    nodeResolve(),
    babel(),
    ...(process.env.NODE_ENV === 'production' ? productionPlugins : []),
    wrapper({
      wrapper: path.resolve('index.html'),
    }),
  ],
  interop: false,
};
