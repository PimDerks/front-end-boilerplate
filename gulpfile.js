var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

// import
gulp.task('watch', require('./gulp/gulp.watch')(browserSync));
gulp.task('sass', require('./gulp/gulp.sass'));
gulp.task('swig', require('./gulp/gulp.swig'));
gulp.task('serve', require('./gulp/gulp.serve'));

// dev
gulp.task('dev', ['watch', 'serve'], function() {

    browserSync.init({
        proxy: "http://localhost:1337"
    });

});