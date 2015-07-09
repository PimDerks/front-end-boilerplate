var gulp = require('gulp'),
    config = require('./gulp.config'),
    connect = require('gulp-connect');

module.exports = function(){

    connect.server({
        root: [config.paths.www],
        port: config.server.port
    });

};