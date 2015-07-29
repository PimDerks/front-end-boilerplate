var gulp = require('gulp');

module.exports.copyJS = function () {

    var src = config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    return gulp.src(src)
        .pipe(gulp.dest(dest));

};

module.exports.copyAssets = function () {

    var src = config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.assets;

    return gulp.src(src)
        .pipe(gulp.dest(dest));

};