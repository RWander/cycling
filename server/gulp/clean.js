var gulp = require('gulp-help')(require('gulp'));
var del = require('del');
var path = require('./.path.json');

gulp.task('clean', 'Cleans the dist folder', function() {
  return del([ path.dist ]);
});
