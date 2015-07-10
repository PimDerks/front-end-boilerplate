var gulp = require('gulp'),
    util = require('gulp-util'),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    config = require('./gulp.config'),
    htmlhint = require("gulp-htmlhint"),
    w3cjs = require('gulp-w3cjs'),
    jscs = require('gulp-jscs');

gulp.task('jshint', function() {
    return gulp.src(config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
    return gulp.src(config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/**/*.js')
        .pipe(jscs());
});

gulp.task('scsslint', function() {

    return gulp.src(config.roots.src + '/' + config.paths.static + '/' + config.paths.sass + '/**/*.js')
        .pipe(scsslint({
            'config': './.scss-lint.yml'
        }));

});

gulp.task('w3c', function () {

    return gulp.src(config.roots.www + '/**/*.html')
        .pipe(w3cjs());

});

gulp.task('htmlhint', function () {

    return gulp.src(config.roots.www + '/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());

});

module.exports = ['jshint', 'jscs', 'scsslint', 'htmlhint', 'w3c'];