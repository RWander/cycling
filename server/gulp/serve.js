var gulp = require('gulp-help')(require('gulp'));
var gls = require('gulp-live-server');
var path = require('./.path.json');

gulp.task('serve', 'Run development server (single worker process, use "npm start" for run the cluster)', ['lint'], function() {
  var server = gls(path.app, { env: { NODE_ENV: 'development' } });
  server.start().then(function(result) {
    process.exit(result.code);
  });
});
