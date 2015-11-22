var gulp = require('gulp-help')(require('gulp'));
var bowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('build:fonts', 'Copy the font files to the dist folder.', function() {
  return gulp.src(bowerFiles('**/*.{eot,svg,ttf,woff,woff2,otf}'))
    .pipe(debug({ title: 'font:'}))
    .pipe(gulp.dest(path.dist.fonts));
});
