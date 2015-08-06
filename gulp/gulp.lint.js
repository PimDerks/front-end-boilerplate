var gulp = require('gulp'),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    config = require('./gulp.config'),
    htmlhint = require("gulp-htmlhint"),
    w3cjs = require('gulp-w3cjs'),
    jscs = require('gulp-jscs');

var jsFiles = [
    config.roots.src + '/' + config.paths.static + '/**/*.js',
    config.roots.src + '/' + config.paths.modules + '/**/*.js',
    '!' + config.roots.src + '/' + config.paths.modules + '/base/js/00-vendor/**/*.js',
    '!' + config.roots.src + '/' + config.paths.static + '/vendor/**/*.js',
    '!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/shim/**/*.js',
    '!' + config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/initial.js'
];

module.exports.jshint = function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
};

module.exports.jscs = function () {
    return gulp.src(jsFiles)
        .pipe(jscs());
};

module.exports.scsslint = function() {

    return gulp.src([
            config.roots.src + '/**/*.scss'
        ])
        .pipe(scsslint({
            'config': './.scss-lint.yml'
        }));

};

module.exports.w3c = function () {

    return gulp.src(config.roots.www + '/**/*.html')
        .pipe(w3cjs());

};

module.exports.htmlhint = function () {

    return gulp.src(config.roots.www + '/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());

};