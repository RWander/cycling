var gulp = require('gulp-help')(require('gulp'));
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var size = require('gulp-size');
var typescript = require('gulp-typescript');
var path = require('./.path.json');

gulp.task(
  'build:ts',
  'Compile all TypeScript files.',
  ['build:tsconfig'],
  function() {
    var tsProject = typescript.createProject(
      'tsconfig.json', {
        sortOutput: true,
        outFile: "app.min.js",
      }
    );
    return tsProject.src()
      .pipe(sourcemaps.init())
        .pipe(typescript(tsProject)).js
        .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(debug({ title: 'js:'}))
      .pipe(gulp.dest(path.dist.js))
      .pipe(size({ showFiles: true, title: 'js (output):'}));
  }
);
