var gulp = require('gulp'),
    util = require('gulp-util'),
    config = require('./gulp.config'),
    connect = require('gulp-connect');

module.exports = function(){

    connect.server({
        root: [config.paths.www],
        port: config.server.port
    });

};