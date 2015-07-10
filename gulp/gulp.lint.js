var gulp = require('gulp'),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    config = require('./gulp.config'),
    htmlhint = require("gulp-htmlhint"),
    w3cjs = require('gulp-w3cjs');

gulp.task('jshint', function() {
    return gulp.src(config.paths.js + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('scsslint', function() {

    return gulp.src(config.paths.sass + '/**/*.scss')
        .pipe(scsslint({
            'config': './.scss-lint.yml'
        }));

});

gulp.task('w3c', function () {

    return gulp.src(config.paths.www + '/**/*.html')
        .pipe(w3cjs());

});

gulp.task('htmlhint', function () {

    return gulp.src(config.paths.www + '/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());

});

module.exports = ['jshint', 'scsslint', 'htmlhint', 'w3c'];