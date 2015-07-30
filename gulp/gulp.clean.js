var gulp = require('gulp'),
    clean = require('gulp-clean');

module.exports = function() {

    // empty and remove www and tmp directories
    var www = config.roots.www,
        tmp = config.roots.tmp,
        dest = config.roots.dest;

    return gulp.src([www, tmp, dest])
        .pipe(clean({
            read: false // do not read files, just remove
        }));

};