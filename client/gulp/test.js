var gulp = require('gulp-help')(require('gulp'));
var jasmine = require('gulp-jasmine');
var debug = require('gulp-debug');

gulp.task('test', 'Runs the Jasmine test specs', ['build'], function () {
  return gulp.src('./test/*.js')
    .pipe(debug({ title: 'tested:'}))
    .pipe(jasmine());
});
