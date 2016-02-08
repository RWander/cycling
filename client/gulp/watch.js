var gulp = require('gulp-help')(require('gulp'));
var watch = require('gulp-watch');
var path = require('./.path.json');

gulp.task('watch', "Spy on src files", function() {
    watch([path.src.jade], function(event, cb) {
        gulp.start('build:jade');
    });
    watch([path.src.scss], function(event, cb) {
        gulp.start('build:scss');
    });
    // watch([path.src.ts], function(event, cb) {
    //     gulp.start('build:ts');
    // });
    watch([path.src.img], function(event, cb) {
        gulp.start('build:img');
    });
});
