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
    concatAndMinify(bowerFiles('**/*.js'), 'vendor.min.js');
  }
);

gulp.task(
  'build:ts',
  'Compile all TypeScript files into js, then concatenate and minify them.',
  ['build:ts-compile'],
  function() {
    concatAndMinify(path.compile.js, 'app.min.js');
  }
);

gulp.task(
  'build:ts-compile',
  'Compile all TypeScript files.',
  ['build:tsconfig'],
  function() {
    // TODO (Roman)
    // write *.map file to the separate file.
    var tsProject = typescript.createProject('tsconfig.json', { sortOutput: true });
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .js
        .pipe(debug({ title: 'js:'}))
        .pipe(sourcemaps.write())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.dist.js))
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

function concatAndMinify(files, outputName) {
  gulp.src(files)
    .pipe(debug({ title: 'js:'}))
    .pipe(sourcemaps.init())
      .pipe(concat(outputName))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.js))
    .pipe(size({ showFiles: true, title: 'js (output):'}));
}
