var gulp = require('gulp'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize');

module.exports = function(){

    var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.js,
        files = src + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    return gulp.src(files)
        .pipe(amdOptimize("main", {
            "paths": {
                "conditioner": 'vendor/rikschennink/conditioner',
                "modernizr": 'vendor/paulirish/modernizr'
            }
        }))
        .pipe(concat("main-build.js"))
        .pipe(gulp.dest(dest));

};