var gulp = require('gulp-help')(require('gulp'));
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var debug = require('gulp-debug');
var size = require('gulp-size');
var path = require('./.path.json');

gulp.task('build:scss', 'Build the scss application styles.', function() {
  return gulp.src(path.src.scss)
    .pipe(debug({ title: 'scss:'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({ browsers: ["last 3 versions"] }))
      .pipe(cssmin())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.dist.css))
    .pipe(size({ showFiles: true, title: 'css:'}));
});
