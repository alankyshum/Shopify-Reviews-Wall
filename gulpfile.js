const gulp = require('gulp');
const file = require('gulp-file');
const rollup = require('rollup');
const rollupOptions = require('./config/rollup.config');
const pathsConfig = require('./config/path.config');

gulp.task('build:js', () =>
  rollup.rollup(rollupOptions.inputOptions())
    .then(bundle => bundle.generate(rollupOptions.outputOptions))
    .then(gen => {
      return file('App.js', gen.code, {src: true})
        .pipe(gulp.dest('js/'))
    })
);

gulp.task('watch', function() {
  gulp.watch(pathsConfig.js.glob, ['build:js']);
});

gulp.task('dev', function() {
  return rollup.rollup(rollupOptions.inputOptions('dev'))
    .then(bundle => bundle.generate(rollupOptions.outputOptions))
    .then(gen => {
      return file('App.js', gen.code, {src: true})
        .pipe(gulp.dest('js/'))
    })
});

gulp.task('default', ['dev'], () => {});
