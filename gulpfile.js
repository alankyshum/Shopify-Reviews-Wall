const gulp = require('gulp');
const file = require('gulp-file');
const babel = require('rollup-plugin-babel');
const rollup = require('rollup');

const jsFiles = {
  main: 'jsx/main.js',
  glob: 'jsx/**/*.js'
};

gulp.task('build:js', () =>
  rollup.rollup({
    input: jsFiles.main,
    plugins: [
      babel({
        presets: [
          [ "es2015", { "modules": false } ]
        ],
        babelrc: false,
        exclude: 'node_modules/**'
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
  gulp.watch(jsFiles, ['build:js']);
});

gulp.task('default', ['build:js'], () => {});
