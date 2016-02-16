/* eslint-env node */

'use strict';

var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

// for development
gulp.task(
  'build:dev',
  'Lounch webpack to build for the development env.',
  () => runSequence('clean',
    ['build:html', 'build:css'],
    () => build('development')
  )
);

// for production
gulp.task(
  'build:prod',
  'Lounch webpack to build for the production env.',
  () => runSequence('clean',
    ['build:html', 'build:css'],
    () => build('production')
  )
);

gulp.task(
  'build:html',
  'Copy all html files to the build directory.',
  () => {
    return gulp.src('src/**/*.html')
      //.pipe(debug({ title: 'html:'}))
      .pipe(gulp.dest('public'));
  }
);

gulp.task(
  'build:css',
  'Copy vendor css styles to the build directory.',
  () => {
    // Twitter Bootstrap
    let path = 'node_modules/bootstrap/dist/css/bootstrap.min.css*';
    return gulp.src(path)
      .pipe(gulp.dest('public/css'));
  }
);

function build(env) {
  var envObj = Object.create(process.env);
  envObj.NODE_ENV = env;

  spawn(
    'webpack',
    ['--progress', '--display-modules', '-v'],
    {
      env: envObj,
      stdio: 'inherit'
    });
}
