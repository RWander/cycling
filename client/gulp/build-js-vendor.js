var gulp = require('gulp-help')(require('gulp'));
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var size = require('gulp-size');
var path = require('./.path.json');

gulp.task(
  'build:js-vendor',
  'Concatenate and minify all vendor js files.',
  function() {
    gulp.src(bowerFiles('**/*.js'))
      .pipe(debug({ title: 'js:'}))
      .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.dist.js))
      .pipe(size({ showFiles: true, title: 'js (output):'}));
  }
);
