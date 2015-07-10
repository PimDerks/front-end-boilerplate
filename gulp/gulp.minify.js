var gulp = require('gulp'),
    util = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify');

gulp.task('uglify', function() {

    gulp.task('compress', function() {

        var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.js + '/*',
            dest = config.roots.www + '/' + config.paths.staticMin + '/' + config.paths.js;

        return gulp.src(src)
            .pipe(uglify())
            .pipe(gulp.dest(dest));

    });

});

gulp.task('imagemin', function () {

    return gulp.src(config.roots.www + '/' + config.paths.static + '/' + config.paths.img + '/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.paths.assets));

});

module.exports = ['imagemin', 'uglify'];