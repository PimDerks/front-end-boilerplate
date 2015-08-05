var gulp = require('gulp'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize');

module.exports = function(){

    var dir = config.roots.www + '/' + config.paths.static + '/' + config.paths.ui,
        files = dir + '/**/*',
        dest = dir;

    return gulp.src(files)
        .pipe(amdOptimize("main", {
            "paths": {
                "conditioner": 'vendor/conditioner/conditioner',
                "modernizr": 'vendor/modernizr/modernizr'
            }
        }))
        .pipe(concat("main-build.js"))
        .pipe(gulp.dest(dest));

};