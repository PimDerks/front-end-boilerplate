var gulp = require('gulp'),
    clean = require('gulp-clean'),
    config = require('./gulp.config');

module.exports = function(){

    // empty and remove www and tmp directories
    var src = [];
    src.push(config.roots.www);
    src.push(config.roots.tmp);
    src.push(config.roots.dest);
    src.push(config.roots.styleguide);

    return gulp.src(src)
        .pipe(clean({
            read: false, // do not read files, just remove
            force: true // force files for Windows
        }));
};