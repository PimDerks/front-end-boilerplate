var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize');

module.exports = function(){

    var dir = config.roots.dest + '/' + config.paths.static + '/' + config.paths.js,
        files = dir + '/**/*.js',
        dest = config.roots.dest + '/' + config.paths.staticMin + '/' + config.paths.js;

    // Modules to compile. We must use the actual file path here.
    var modules = ["main", "module/Module"];

    modules.forEach(function(module){
        gulp.src(files)
            .pipe(amdOptimize(module, {
                "paths": {
                    "conditioner": 'base/vendor/conditioner/conditioner',
                    "modernizr": 'base/vendor/modernizr/modernizr'
                },
                "baseUrl": dir,
                "exclude": [] // again, we need to use the original path structure here
            }))
            .pipe(concat(module + '.js'))
            .pipe(uglify())
            .pipe(gulp.dest(dest));
    });

};