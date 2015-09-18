var gulp = require('gulp-help')(require('gulp'));
var jade = require('gulp-jade');
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('jade', 'Compiles all jade templates', function() {
  gulp.src(path.src.jade)
    .pipe(debug({ title: 'jade-compiled:'}))
    .pipe(jade())
    .pipe(gulp.dest(path.dist.html));
});
