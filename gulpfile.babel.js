import gulp from 'gulp';
import file from 'gulp-file';
import { rollup } from 'rollup';
import babel from 'gulp-babel';
import rollupOptions from './config/rollup.config';
import pathConfig from './config/path.config';
import { backend as babelConfig } from './config/babel.config';

gulp.task('build:js', () =>
  rollup(rollupOptions.inputOptions())
    .then(bundle => bundle.generate(rollupOptions.outputOptions))
    .then(gen => {
      return file('App.js', gen.code, {src: true})
        .pipe(gulp.dest('js/'))
    })
);

gulp.task('build:server', function() {
  gulp.src(pathConfig.server)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest('.'))
});

gulp.task('watch', function() {
  gulp.watch(pathConfig.js.glob, ['build:js']);
  gulp.watch(pathConfig.server, ['build:server']);
});

gulp.task('default', ['build:js', 'build:server'], () => {});
