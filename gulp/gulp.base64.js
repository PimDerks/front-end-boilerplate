var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize'),
    base64 = require('gulp-base64');

module.exports = function(){

    var src = config.roots.dest + '/' + config.paths.static + '/**/*.css',
        dest = config.roots.dest + '/' + config.paths.staticMin;

    return gulp.src(src)
        .pipe(base64({
            extensions: ['ttf', 'woff', 'woff2'],
            maxImageSize: 1024*1024 // max size in bytes
        }))
        .pipe(gulp.dest(dest));

};