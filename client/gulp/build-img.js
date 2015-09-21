var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('build:img', 'Copy images to the dist folder.', function() {
  gulp.src(path.src.img)
    .pipe(debug({ title: 'img:'}))
    .pipe(gulp.dest(path.dist.img));
});
