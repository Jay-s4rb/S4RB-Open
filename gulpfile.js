const gulp = require('gulp');
const mocha = require('gulp-mocha');
const env = require('gulp-env');
const eslint = require('gulp-eslint');

gulp.task('test', async () =>
  gulp
    .src(['./src/server/test/**/*.js'])
    .pipe(
      env({
        vars: {
          NODE_ENV: 'test',
        },
      }),
    )
    .pipe(mocha({ reporter: 'spec' })),
);

gulp.task('lint', () =>
  gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);
