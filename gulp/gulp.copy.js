var gulp = require('gulp'),
    util = require('gulp-util');

gulp.task('copy-js', function () {

    var src = config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    return gulp.src(src)
        .pipe(gulp.dest(dest));

});

gulp.task('copy-assets', function () {

    var src = config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.assets;

    return gulp.src(src)
        .pipe(gulp.dest(dest));

});

module.exports = ['copy-js', 'copy-assets'];