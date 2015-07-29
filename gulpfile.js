var gulp = require('gulp'),
    config = require('./gulp/gulp.config'),
    util = require('gulp-util'),
    browserSync = require('browser-sync').create();

// import
gulp.task('clean', require('./gulp/gulp.clean'));
gulp.task('watch', require('./gulp/gulp.watch')(browserSync));
gulp.task('sass', require('./gulp/gulp.sass'));
gulp.task('swig', require('./gulp/gulp.swig'));
gulp.task('minify', require('./gulp/gulp.minify'));
gulp.task('lint', require('./gulp/gulp.lint'));
gulp.task('copy', require('./gulp/gulp.copy'));
gulp.task('browser-sync', require('./gulp/gulp.browsersync')(browserSync));

// dev
gulp.task('dev', ['clean', 'copy', 'sass', 'swig', 'watch', 'browser-sync']);