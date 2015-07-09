var gulp = require('gulp'),
    watch = require('gulp-watch'),
    config = require('./gulp.config');

module.exports = function(browserSync) {

    return function() {

        // watch content
        gulp.watch(config.paths.content + '/**/*', ['swig']);

        // watch data
        gulp.watch(config.paths.data + '/**/*', ['swig']);

        // watch sass files
        gulp.watch(config.paths.sass + '/**/*', ['sass']);

        // watch www
        gulp.watch(config.paths.www + '/**/*').on('change', browserSync.reload);

    };

};