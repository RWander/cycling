var gulp = require('gulp-help')(require('gulp'));
var gls = require('gulp-live-server');

gulp.task('serve', 'Run development server', ['build'], function() {
  var server = gls('./dist/app.js', { env: { NODE_ENV: 'development' } });
  server.start().then(function(result) {
      console.log('Development server exited with result:', result);
      process.exit(result.code);
  });
});
