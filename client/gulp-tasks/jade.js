var gulp = require('gulp-help')(require('gulp'));
var jade = require('gulp-jade');
var debug = require('gulp-debug');

gulp.task('jade', 'Compiles all jade templates', function() {
  var LOCALS = {};

  gulp.src('./src/*.jade')
    .pipe(debug({ title: 'jade-compiled:'}))
    .pipe(jade())
    .pipe(gulp.dest('./dist'));
});
