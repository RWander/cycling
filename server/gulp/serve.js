var gulp = require('gulp-help')(require('gulp'));
var gls = require('gulp-live-server');
var path = require('./.path.json');

gulp.task('serve', 'Run development server', function() {
  var server = gls(path.app, { env: { NODE_ENV: 'development' } });
  server.start().then(function(result) {
      console.log('Development server exited with result:', result);
      process.exit(result.code);
  });
});
