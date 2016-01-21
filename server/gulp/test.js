var gulp = require('gulp-help')(require('gulp'));
var jasmine = require('gulp-jasmine');
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('test', 'Runs the Jasmine test specs', function () {
  return gulp.src(path.test)
    .pipe(debug({ title: 'tested:'}))
    .pipe(jasmine());
});
