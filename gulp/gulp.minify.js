var gulp = require('gulp'),
    util = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {

    return gulp.src(config.roots.www + '/' + config.paths.static + '/' + config.paths.img + '/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.paths.assets));

});

module.exports = ['imagemin'];