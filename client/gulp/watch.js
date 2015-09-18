var gulp = require('gulp-help')(require('gulp'));
var watch = require('gulp-watch');
var path = require('./.path.json');

gulp.task('watch', "Spy on src files", function() {
    watch([path.src.jade], function(event, cb) {
        gulp.start('jade');
    });
    // watch([path.watch.scss], function(event, cb) {
    //     gulp.start('scss');
    // });
    watch([path.src.ts], function(event, cb) {
        gulp.start('ts');
    });
    // watch([path.src.img], function(event, cb) {
    //     gulp.start('img');
    // });
    // watch([path.src.fonts], function(event, cb) {
    //     gulp.start('fonts');
    // });
});
