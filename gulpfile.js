var gulp = require('gulp'),
    config = require('./gulp/gulp.config'),
    browserSync = require('browser-sync').create();

// import
gulp.task('watch', require('./gulp/gulp.watch')(browserSync));
gulp.task('sass', require('./gulp/gulp.sass'));
gulp.task('swig', require('./gulp/gulp.swig'));
gulp.task('minify', require('./gulp/gulp.minify'));
// gulp.task('serve', require('./gulp/gulp.serve'));
gulp.task('lint', require('./gulp/gulp.lint'));
gulp.task('browser-sync', require('./gulp/gulp.browsersync')(browserSync));

// dev
gulp.task('dev', ['watch', 'browser-sync']);