var gulp = require('gulp-help')(require('gulp'));
var tslint    = require('gulp-tslint');
var tsConfig = require('../tsconfig.json');
var debug = require('gulp-debug');

var tsFilesGlob = (function(c) {
  return c.filesGlob || c.files || '**/*.ts';
})(tsConfig);

gulp.task('tslint', 'Lints all TypeScript source files', function() {
  return gulp.src(tsFilesGlob)
    .pipe(debug({ title: 'linted:'}))
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});
