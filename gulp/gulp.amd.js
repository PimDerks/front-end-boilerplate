var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize'),
    base64 = require('gulp-base64');

module.exports = function(){

    var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.js + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    return gulp.src(src)
        .pipe(amdOptimize("main", {
            "paths": {
                "conditioner": 'vendor/rikschennink/conditioner',
                "modernizr": 'vendor/paulirish/modernizr'
            }
        }))
        .pipe(concat("main2.js"))
        .pipe(gulp.dest(dest));

};