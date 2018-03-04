const gulp = require('gulp');
const file = require('gulp-file');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const rollup = require('rollup');

const jsFiles = {
  main: 'jsx/main.jsx',
  glob: 'jsx/**/*'
};

gulp.task('build:js', () =>
  rollup.rollup({
    input: jsFiles.main,
    plugins: [
      resolve(),
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
  })
  .then(bundle => bundle.generate({
    format: 'umd',
    name: 'shopifyReviewWall'
  }))
  .then(gen => {
    return file('main.js', gen.code, {src: true})
      .pipe(gulp.dest('js/'))
  })
);

gulp.task('watch', function() {
  gulp.watch(jsFiles.glob, ['build:js']);
});

gulp.task('default', ['build:js'], () => {});
