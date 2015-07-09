var gulp = require('gulp'),
    config = require('./gulp.config');

module.exports = function(browserSync){

    browserSync.init({
        server: {
            baseDir: config.paths.www
        }
    });

};