var gulp = require('gulp'),
    util = require('gulp-util'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('./gulp.config')

module.exports = function() {

    // all files in root of /scss/
    return gulp.src([config.roots.src + '/' + config.paths.static + '/' + config.paths.sass + '/**.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 1 version', '> 5%', 'ie 9'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.roots.www + '/' + config.paths.static + '/' + config.paths.css));

};