var gulp = require('gulp'),
    clean = require('gulp-clean');

module.exports = function() {

    // empty and remove www and tmp directories
    var www = config.roots.www,
        tmp = config.roots.tmp;

    return gulp.src([www, tmp])
        .pipe(clean({
            read: false // do not read files, just remove
        }));

};