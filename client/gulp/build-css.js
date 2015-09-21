var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('build:css', 'Copy css to the dist folder.', function() {
  gulp.src('./src/css/*.css')
    .pipe(debug({ title: 'css:'}))
    .pipe(gulp.dest(path.dist.css));
});
