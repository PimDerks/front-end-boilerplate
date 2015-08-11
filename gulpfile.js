var gulp = require('gulp'),
    config = require('./gulp/gulp.config'),
    bs = require('browser-sync').create(),
    util = require('gulp-util'),
    seq = require('run-sequence');

// require
var api = require('./gulp/gulp.rest'),
    styleguide = require('./gulp/gulp.styleguide'),
    clean = require('./gulp/gulp.clean'),
    concat = require('./gulp/gulp.concat'),
    inline = require('./gulp/gulp.inline'),
    watchWWW = require('./gulp/gulp.watchWWW')(bs),
    sass = require('./gulp/gulp.sass'),
    swig = require('./gulp/gulp.swig'),
    minify = require('./gulp/gulp.minify'),
    amd = require('./gulp/gulp.amd'),
    base64 = require('./gulp/gulp.base64'),
    copy = require('./gulp/gulp.copy'),
    ftp = require('./gulp/gulp.ftp'),
    browserSync = require('./gulp/gulp.browsersync')(bs),
    js = require('./gulp/gulp.javascript');
    swig = require('./gulp/gulp.swig');

// API
gulp.task('api-start', api.run);
gulp.task('api-watch', api.watch);

// Styleguide
gulp.task('styleguide-render', styleguide.render);
gulp.task('styleguide-watch', styleguide.watch);

// Remove temp/www dir
gulp.task('clean', clean);

// Javascript tasks
gulp.task('js-copy', js.copy);
gulp.task('js-copy-modules', js.copyModules);
gulp.task('js-lint', js.lint);
gulp.task('js-watch', js.watch);

// SASS tasks
gulp.task('sass-copy', sass.copy);
gulp.task('sass-lint', sass.lint);
gulp.task('sass-watch', sass.watch);

// HTML/Swig tasks
gulp.task('html-copy', swig.copy);
gulp.task('html-lint', swig.lint);
gulp.task('html-watch', swig.watch);

// Overall watch
gulp.task('www-watch', watchWWW);
gulp.task('watch', ['api-watch', 'js-watch', 'sass-watch', 'html-watch', 'styleguide-watch', 'www-watch']);

// Concat shims
gulp.task('shim', concat.shim);

// Inline assets
gulp.task('inline', inline);

// Copy task
gulp.task('copy-assets', copy.copyAssets);
gulp.task('copy-media', copy.copyMedia);
gulp.task('copy-www-html', copy.copyBuildHTML);
gulp.task('copy-www-static', copy.copyBuildStatic);
gulp.task('copy-www-media', copy.copyBuildMedia);
gulp.task('copy-unminified', copy.copyUnminifiedAssets);

// Automatically update files in browser
gulp.task('browser-sync', browserSync);

// Compile AMD modules
gulp.task('amd', amd);

// Inline assets
gulp.task('base64', base64);

// Minify CSS, JS and images
gulp.task('minifyCSS', minify.minifyCSS);
gulp.task('minifyJS', minify.minifyJS);
gulp.task('minifyImg', minify.minifyImg);
gulp.task('minify', ['minifyCSS', 'minifyJS', 'minifyImg', 'copy-unminified']);

// Deploy
gulp.task('deploy', ftp);

// Initial
gulp.task('initial', function() {
    seq('clean', 'js', 'sass', 'html', 'shim', 'copy-assets', 'copy-media', function(){
        process.exit(0);
    });
});

// devg
gulp.task('dev', function() {
    seq('api-start', 'watch', 'browser-sync');
});

// build js
gulp.task('js', function() {

    if(util.env.killlint) {
        seq('js-copy', 'js-copy-modules');
    } else {
        seq('js-copy', 'js-copy-modules', 'js-lint');
    }

});

// build sass
gulp.task('sass', function() {

    if(util.env.killlint) {
        seq('sass-copy');
    } else {
        seq('sass-copy', 'sass-lint');
    }


});

// build html
gulp.task('html', function(){

    if(util.env.killlint) {
        seq('html-copy');
    } else {
        seq('html-copy', 'html-lint');
    }


});

// build
gulp.task('build', function() {
    seq('copy-www-static', 'copy-www-media', 'minify', 'inline', 'amd', function(){
        process.exit(0);
    });
});
