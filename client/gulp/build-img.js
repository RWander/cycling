var gulp = require('gulp-help')(require('gulp'));
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('build:img', 'Copy optimized images to the dist folder.', function() {
  gulp.src(path.src.img)
    .pipe(debug({ title: 'img:'}))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(path.dist.img));
});
