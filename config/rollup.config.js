const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const pathsConfig = require('./path.config');
// dev server
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
// stylesheets
const scss = require('rollup-plugin-scss');

module.exports = {
  inputOptions(env) {
    const options = {
      input: pathsConfig.js.main,
      plugins: [
        scss({
          output: 'css/main.css'
        }),
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
        }),
      ]
    };

    return options;
  },
  outputOptions: {
    format: 'umd',
    name: 'shopifyReviewWall',
    sourcemap: true
  }
}
