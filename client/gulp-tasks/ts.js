var gulp = require('gulp-help')(require('gulp'));
var tsconfig  = require('gulp-tsconfig-files');

var exec = require('child_process').exec;
var tsConfig = require('../tsconfig.json');

gulp.task('ts', 'Compiles all TypeScript source files', ['tsconfig_files', 'tslint'], function (cb) {
  exec('tsc', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('tsconfig_files', 'Update the files section in tsconfig.json', function () {
  var src = tsConfig.filesGlob;
  if (typeof src !== 'undefined') {
     gulp.src(src).pipe(tsconfig());
  }
});
