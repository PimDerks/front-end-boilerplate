var gulp = require('gulp'),
    concat = require('gulp-concat');

module.exports.shim = function(){

    var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js + '/' + config.paths.shim + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.assets + '/' + config.paths.js;

    return gulp.src(src)
        .pipe(concat("shim.js"))
        .pipe(gulp.dest(dest));

};