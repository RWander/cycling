var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var bowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var size = require('gulp-size');
var path = require('./.path.json');

gulp.task('build:js', 'Concatenate and minify all js files.', ['build:ts'], function() {
  return gulp.src(bowerFiles('**/*.js'))
    .pipe(debug({ title: 'js:'}))
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.dist.js))
    .pipe(size({ showFiles: true, title: 'js (main):'}));
});
