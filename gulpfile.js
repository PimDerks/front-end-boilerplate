var gulp = require('gulp'),
    config = require('./gulp/gulp.config'),
    bs = require('browser-sync').create(),
    seq = require('run-sequence');

// require
var clean = require('./gulp/gulp.clean'),
    concat = require('./gulp/gulp.concat'),
    inline = require('./gulp/gulp.inline'),
    watch = require('./gulp/gulp.watch'),
    watchWWW = require('./gulp/gulp.watchWWW')(bs),
    sass = require('./gulp/gulp.sass'),
    swig = require('./gulp/gulp.swig'),
    minify = require('./gulp/gulp.minify'),
    amd = require('./gulp/gulp.amd'),
    base64 = require('./gulp/gulp.base64'),
    lint = require('./gulp/gulp.lint'),
    copy = require('./gulp/gulp.copy'),
    ftp = require('./gulp/gulp.ftp'),
    browserSync = require('./gulp/gulp.browsersync')(bs);

// Remove temp/www dir
gulp.task('clean', clean);

// Concat tasks
gulp.task('concat-shim', concat.shim);

// Inline
gulp.task('inline', inline);

// Automatically update files in browser
gulp.task('browser-sync', browserSync);

// Compile Swig to HTML
gulp.task('swig', swig);

// Compile SASS to CSS
gulp.task('sass', sass);

// Compile AMD modules
gulp.task('amd', amd);

// Watch files
gulp.task('watch-www', watchWWW);
gulp.task('watch-html', ['swig'], watch.watchHTML);
gulp.task('watch-content', ['swig'], watch.watchContent);
gulp.task('watch-css', ['sass'], watch.watchCSS);
gulp.task('watch-js', watch.watchJS)
gulp.task('watch', ['watch-html', 'watch-content', 'watch-css', 'watch-js', 'watch-www']);

// Inline assets
gulp.task('base64', base64);

// Minify CSS, JS and images
gulp.task('minifyCSS', minify.minifyCSS);
gulp.task('minifyJS', minify.minifyJS);
gulp.task('minifyImg', minify.minifyImg);
gulp.task('minify', ['minifyCSS', 'minifyJS', 'minifyImg']);

// Lint
gulp.task('lint-html', lint.htmlhint);
gulp.task('lint-w3c', lint.w3c);
gulp.task('lint-jscs', lint.jscs);
gulp.task('lint-jshint', lint.jshint)
gulp.task('lint-scss', lint.scsslint);
gulp.task('lint', ['lint-scss', 'lint-jscs', 'lint-jshint', 'lint-w3c', 'lint-html']);

// Copy
gulp.task('copyJS', copy.copyJS);
gulp.task('copyAssets', copy.copyAssets);
gulp.task('copy', ['copyJS', 'copyAssets']);
gulp.task('copyBuildStatic', copy.copyBuildStatic);
gulp.task('copyBuildHTML', inline);

// Deploy
gulp.task('deploy', ftp);

// dev
gulp.task('dev', function() {
    seq('clean', 'copy', 'concat-shim', 'amd', 'sass', 'base64', 'swig', 'watch', 'browser-sync');
});

// build
gulp.task('build', function() {
    seq('copyBuildStatic', 'minify', 'copyBuildHTML');
});