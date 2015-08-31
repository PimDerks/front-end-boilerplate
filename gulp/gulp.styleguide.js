var gulp = require('gulp'),
    swig = require('swig'),
    gulpSwig = require('gulp-swig'),
    markedSwig = require('swig-marked'),
    path = require('path'),
    config = require('./gulp.config'),
    utils = require('./gulp.utils'),
    fs = require('fs'),
    fse = require('fs-extra'),
    Promise = require('./gulp.promise'),
    htmlhint = require("gulp-htmlhint"),
    w3cjs = require('gulp-w3cjs');

    require('swig-highlight').apply(swig);

    markedSwig.useFilter(swig);
    markedSwig.useTag(swig);

module.exports.render = function() {

    var src = [];
    src.push(config.roots.src + '/' + config.paths.styleguide + '/**/*.swig');

    var dest = config.roots.www + '/' + config.paths.styleguide;

    return gulp.src(src)
        .pipe(gulpSwig())
        .pipe(gulp.dest(dest));

};

module.exports.watch = function() {

    gulp.watch(config.roots.src + '/' + config.paths.styleguide + '/**/*', ['styleguide-render']);

};