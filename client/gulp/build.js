var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');        // https://github.com/OverZealous/run-sequence
var debug = require('gulp-debug');
var path = require('./.path.json');

// This will run in this order:
// * clean
// * build *.ts and *.scss files in parallel
// * build *.jade
// * Finally call the callback function
gulp.task('build', 'Builds the site.', function(cb) {
  runSequence('clean',
    ['build:js'/*, 'scss'*/, 'build:img', 'build:css'],
    'build:jade',
    cb);
});
