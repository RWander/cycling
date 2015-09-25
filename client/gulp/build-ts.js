var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var bowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var size = require('gulp-size');
var tsconfig = require('gulp-tsconfig-files');
var typescript = require('gulp-typescript');
var path = require('./.path.json');
var tsConfig = require('../tsconfig.json');

gulp.task(
  'build:scripts',
  'Compiles all TypeScript "files", concatenate and minify all js files.',
  ['build:ts', 'build:js-vendor']
);

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
      .pipe(getSize());
  }
);

gulp.task(
  'build:ts',
  'Compile all TypeScript files.',
  ['build:tsconfig'],
  function() {
    var tsProject = typescript.createProject(
      'tsconfig.json', {
        sortOutput: true,
        outFile: "app.js",
      }
    );
    return tsProject.src()
      .pipe(sourcemaps.init())
        .pipe(typescript(tsProject)).js
        .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(debug({ title: 'js:'}))
      .pipe(gulp.dest(path.dist.js))
      .pipe(getSize());
  }
);

gulp.task(
  'build:tsconfig',
  'Update files property of tsconfig.json file.',
  function() {
    gulp.src(tsConfig.filesGlob)
      .pipe(tsconfig());
  }
);

function getSize() {
  return size({ showFiles: true, title: 'js (output):'});
}
