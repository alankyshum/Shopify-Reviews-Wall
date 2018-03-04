const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const pathsConfig = require('./path.config');

module.exports = {
  inputOptions: {
    input: pathsConfig.js.main,
    plugins: [
      resolve({
        extensions: ['.js', '.jsx']
      }),
      babel({
        presets: [ [ "es2015-rollup" ] ],
        plugins: ["babel-plugin-syntax-jsx", ["babel-plugin-inferno", {"imports": true}]],
        babelrc: false,
        exclude: 'node_modules/**'
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify("production")
      })
    ]
  },
  outputOptions: {
    format: 'umd',
    name: 'shopifyReviewWall',
    sourcemap: true
  }
}
