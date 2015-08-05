var gulp = require('gulp'),
    watch = require('gulp-watch'),
    config = require('./gulp.config');

module.exports.watchContent = function() {

    // watch content
    gulp.watch(config.roots.content + '/' + config.content.pages + '/**/*', ['swig']);

    // watch data
    gulp.watch(config.roots.content + '/' + config.content.data + '/**/*', ['swig']);

};

module.exports.watchJS = function() {

    // watch js files
    gulp.watch(config.roots.src + '/**/*.js', ['lint-jshint', 'lint-jscs', 'copyJS', 'amd']);

};

module.exports.watchCSS = function() {

    // watch sass files
    gulp.watch(config.roots.src + '/**/*.scss', ['lint-scss', 'sass']);

};

module.exports.watchHTML = function() {

    // watch swig
    gulp.watch(config.roots.src + '/' + config.paths.templates + '/**/*', ['swig']);
    gulp.watch(config.roots.src + '/' + config.paths.includes + '/**/*', ['swig']);

};