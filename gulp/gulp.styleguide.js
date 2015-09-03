var gulp = require('gulp'),
    swig = require('swig'),
    gulpSwig = require('gulp-swig'),
    markedSwig = require('swig-marked'),
    path = require('path'),
    config = require('./gulp.config'),
    utils = require('./gulp.utils'),
    fs = require('fs');

    require('swig-highlight').apply(swig);

    markedSwig.useFilter(swig);
    markedSwig.useTag(swig);

module.exports.render = function() {

    var src = [];
    src.push(config.roots.src + '/' + config.paths.styleguide + '/**/*.swig');

    var dest = config.roots.www + '/' + config.paths.styleguide;

    return gulp.src(src)
        .pipe(gulpSwig({
            defaults: {
                cache: false
            }
        }))
        .pipe(gulp.dest(dest));

};

module.exports.watch = function() {

    gulp.watch(config.roots.src + '/' + config.paths.styleguide + '/**/*.swig', ['output-styleguide']);

};