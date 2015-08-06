var gulp = require('gulp')
    rename = require('gulp-rename');

module.exports.copySrc = function () {

    return gulp.src(config.roots.src + '/**/*')
        .pipe(gulp.dest(config.roots.tmp));

};

module.exports.copySwig = function () {

    return gulp.src(config.roots.src + '/**/*.swig')
        .pipe(gulp.dest(config.roots.tmp));

};

module.exports.copyJS = function () {

    var src = config.roots.src + '/' + config.paths.modules + '/**/*.js',
        ignoreShimDir = '!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js + '/' + config.paths.shim,
        ignoreShim = '!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js + '/' + config.paths.shim + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    return gulp.src([src, ignoreShim, ignoreShimDir])
        .pipe(rename(function (path) {

            // remove 00- from dir-name
            path.dirname = path.dirname.replace(/[0-9]{2}-+/ig,'');

            // remove /js/'s from dir-name
            var old = path.dirname;
            path.dirname = path.dirname.replace(/\/js/ig, '');

        }))
        .pipe(gulp.dest(dest));

};

module.exports.copyAssets = function () {

    var src = [],
        dest = config.roots.www + '/' + config.paths.static;

    src.push(config.roots.src + '/' + config.paths.static + '/**/*'); // all assets
    src.push('!' + config.roots.src + '/**/*.scss'); // ignore scss files
    src.push('!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.sass); // ignore sass dir
    src.push('!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/' + config.paths.shim);
    src.push('!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/' + config.paths.shim + '/**/*');

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