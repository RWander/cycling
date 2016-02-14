/* eslint-env node */

'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;

// for development
gulp.task(
  'build:dev',
  'Lounch webpack to build for the development env.',
  ['clean', 'build:html'],
  (cb) => build('development', cb)
);

// for production
gulp.task(
  'build:prod',
  'Lounch webpack to build for the production env.',
  ['clean', 'build:html'],
  (cb) => build('production', cb)
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

function build(env, cb) {
  let child = spawn(
    'webpack',
    [/*'--progress', */'--display-modules', '-v'],
    { env: { NODE_ENV: env } });

  let stdout;
  let stderr;

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    if (data.indexOf('ERROR') === -1) {
      stdout += data;
      gutil.log(data);
    }
    else {
      stderr += data;
      gutil.log(gutil.colors.red(data));
    }
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    stderr += data;
    gutil.log(gutil.colors.red(data));
  });

  child.on('close', function(code) {
    if (code === 0 && !stderr) {
      gutil.log(gutil.colors.green('Build seccess'));
    } else {
      gutil.log(gutil.colors.red('Build failed'));
    }
    cb();
  });
}
