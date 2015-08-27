var gulp = require('gulp'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    _ = require('lodash');

function bundle() {
    return b.bundle()
        .pipe(source('browserify.js'))
        .pipe(gulp.dest('./www/static/js/'));
}

// add custom browserify options here
var customOpts = {
    entries: ['./src/modules/main.js'],
    debug: true,
    poll: 100
};

var opts = _.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.on('update', function() {
    bundle();
});

module.exports = bundle;