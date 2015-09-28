var gulp = require('gulp-help')(require('gulp'));
var bowerFiles = require('main-bower-files');
var size = require('gulp-size');
var path = require('./.path.json');

gulp.task('build:css-vendor', 'Build scss-files.', function() {
  return gulp.src(bowerFiles('**/*.{min.css,map}'))
    .pipe(size({ showFiles: true, title: 'css:'}))
    .pipe(gulp.dest(path.dist.css));
});
