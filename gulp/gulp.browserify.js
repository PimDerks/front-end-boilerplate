var gulp = require('gulp'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    _ = require('lodash');

function bundle() {
    return b.bundle()
        .pipe(source('out2.js'))
        .pipe(gulp.dest('./blaat/'));
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
    console.log('changing')
    bundle();
});

module.exports = bundle;