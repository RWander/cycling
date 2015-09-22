var gulp = require('gulp-help')(require('gulp'));
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var bowerFiles = require('main-bower-files');
var rename = require("gulp-rename");
var debug = require('gulp-debug');
var size = require('gulp-size');
var merge = require('merge-stream');
var path = require('./.path.json');

function vendorCss() {
  return gulp.src(bowerFiles('**/*.{min.css,map}'))
    .pipe(size({ showFiles: true, title: 'css:'}))
    .pipe(gulp.dest(path.dist.css));
}

gulp.task('build:scss', 'Build scss-files.', function() {
  var vendorCss = gulp.src(bowerFiles('**/*.{min.css,map}'))
    .pipe(size({ showFiles: true, title: 'css:'}))
    .pipe(gulp.dest(path.dist.css));

  var appCss = gulp.src(path.src.scss)
    .pipe(debug({ title: 'scss:'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssmin())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.dist.css))
    .pipe(size({ showFiles: true, title: 'css:'}));

    return merge(vendorCss, appCss);
});
