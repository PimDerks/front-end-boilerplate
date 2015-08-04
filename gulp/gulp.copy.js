var gulp = require('gulp');

module.exports.copyJS = function () {

    var src = config.roots.src + '/**/*.js',
        ignoreShimDir = '!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js + '/' + config.paths.shim,
        ignoreShim = '!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js + '/' + config.paths.shim + '/**/*',
        dest = config.roots.www;

    return gulp.src([src, ignoreShim, ignoreShimDir])
        .pipe(gulp.dest(dest));

};

module.exports.copyAssets = function () {

    var src = [],
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.assets;

    src.push(config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/**/*'); // all assets
    src.push('!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.sass); // ignore sass dir
    src.push('!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.sass + '/**/*'); // ignore sass file
    src.push('!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js + '/**/*'); // ignore js files (copyJS task)

    return gulp.src(src)
        .pipe(gulp.dest(dest));

};

module.exports.copyBuildStatic = function () {

    var src = config.roots.www + '/' + config.paths.static + '/**/*',
        dest = config.roots.dest + '/' + config.paths.static;

    return gulp.src(src)
        .pipe(gulp.dest(dest));

};


module.exports.copyBuildHTML = function () {

    var src = config.roots.www + '/**/*.html',
        dest = config.roots.dest;

    return gulp.src(src)
        .pipe(gulp.dest(dest));

};