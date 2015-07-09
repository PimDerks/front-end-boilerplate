var gulp = require('gulp'),
    scsslint = require('gulp-scss-lint'),
    config = require('./gulp.config');

module.exports = function() {

    return gulp.src(config.paths.sass + '/**/*.scss')
        .pipe(scsslint({
            'config': './gulp/gulp.lint.scss.yml'
        }));
};