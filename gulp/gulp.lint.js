var gulp = require('gulp'),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    config = require('./gulp.config');

gulp.task('jshint', function() {
    return gulp.src(config.paths.js + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scsslint', function() {

    return gulp.src(config.paths.sass + '/**/*.scss')
        .pipe(scsslint({
            'config': './.scss-lint.yml'
        }));

});

module.exports = ['jshint', 'scsslint'];