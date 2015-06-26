var gulp = require('gulp'),
    connect = require('gulp-connect');

module.exports = function(){

    connect.server({
        root: ['www'],
        port: 1337
    });

};