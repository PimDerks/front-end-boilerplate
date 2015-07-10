var gulp = require('gulp'),
    watch = require('gulp-watch'),
    util = require('gulp-util'),
    config = require('./gulp.config');

module.exports = function(browserSync) {

    return function() {

        // watch content
        gulp.watch(config.roots.content + '/' + config.content.pages + '/**/*', ['swig']);

        // watch data
        gulp.watch(config.roots.content + '/' + config.content.data + '/**/*', ['swig']);

        // watch swig
        gulp.watch(config.roots.src + '/' + config.paths.templates + '/**/*', ['swig']);
        gulp.watch(config.roots.src + '/' + config.paths.includes + '/**/*', ['swig']);

        // watch sass files
        gulp.watch(config.roots.src + '/' + config.paths.static + '/' + config.paths.sass + '/**/*', ['sass']);

        // watch js files
        gulp.watch(config.roots.src + '/' + config.paths.static + '/' + config.paths.js + '/**/*', ['copy-js']);

        // watch www
        gulp.watch(config.roots.www + '/**/*').on('change', browserSync.reload);

    };

};