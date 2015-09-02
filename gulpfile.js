var gulp = require('gulp'),
    config = require('./gulp/gulp.config'),
    bs = require('browser-sync').create(),
    util = require('gulp-util'),
    seq = require('run-sequence'),
    shell = require('gulp-shell'),
    server = require('karma').Server,
    exec = require('child_process').exec;

// require
var api = require('./gulp/gulp.rest'),
    modules = require('./gulp/gulp.styleguide'),
    styleguide = require('./gulp/gulp.styleguide'),
    modules = require('./gulp/gulp.modules'),
    clean = require('./gulp/gulp.clean'),
    concat = require('./gulp/gulp.concat'),
    inline = require('./gulp/gulp.inline'),
    watchWWW = require('./gulp/gulp.watchWWW')(bs),
    sass = require('./gulp/gulp.sass'),
    swig = require('./gulp/gulp.swig'),
    minify = require('./gulp/gulp.minify'),
    base64 = require('./gulp/gulp.base64'),
    copy = require('./gulp/gulp.copy'),
    ftp = require('./gulp/gulp.ftp'),
    browserSync = require('./gulp/gulp.browsersync')(bs),
    js = require('./gulp/gulp.javascript');
    swig = require('./gulp/gulp.swig'),
    browserify = require('./gulp/gulp.browserify'),
    docs = require('./gulp/gulp.docs');

// Testing
gulp.task('js-test', function (done) {
    new server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

// Linting
gulp.task('lint-sass', sass.lint);
gulp.task('lint-js', js.lint);
gulp.task('lint-html', swig.lint);

// Outputting DEV
gulp.task('output-js', js.copy);
gulp.task('output-js-modules', js.copyModules);
gulp.task('output-sass', sass.copy);
gulp.task('output-html', swig.copy);

// Outputting DOCS
gulp.task('output-modules', modules.render);
gulp.task('output-styleguide', styleguide.render);
gulp.task('output-sass-styleguide', sass.copyStyleguide);
gulp.task('output-docs', docs.render);

// Copy task
gulp.task('copy-assets', copy.copyAssets);
gulp.task('copy-media', copy.copyMedia);
gulp.task('copy-www-html', copy.copyBuildHTML);
gulp.task('copy-www-static', copy.copyBuildStatic);
gulp.task('copy-www-media', copy.copyBuildMedia);
gulp.task('copy-unminified', copy.copyUnminifiedAssets);

// Watching DEV
gulp.task('watch-api', api.watch);
gulp.task('watch-js', js.watch);
gulp.task('watch-sass', sass.watch);
gulp.task('watch-html', swig.watch);
gulp.task('watch-www', watchWWW);
gulp.task('watch', ['watch-api', 'watch-modules', 'watch-js', 'watch-sass', 'watch-html', 'watch-www']);

// Watching DOC
gulp.task('watch-modules', modules.watch);
gulp.task('watch-docs', docs.watch);
gulp.task('watch-styleguide', styleguide.watch);
gulp.task('watch-styleguide-sass', sass.watchStyleguide);

// Start API
gulp.task('api-start', api.run);

// Browserify
gulp.task('browserify', browserify);

// Automatically update files in browser
gulp.task('browser-sync', browserSync);

// Remove temp/www dir
gulp.task('clean', clean);

// Concat shims
gulp.task('shim', concat.shim);

// Inline assets
gulp.task('inline', inline);

// Inline assets
gulp.task('base64', base64);

// Minify CSS, JS and images
gulp.task('minify-css', minify.minifyCSS);
gulp.task('minify-js', minify.minifyJS);
gulp.task('minify-img', minify.minifyImg);
gulp.task('minify', ['minifyCSS', 'minifyJS', 'minifyImg', 'copy-unminified']);

// Deploy
gulp.task('deploy', ftp);

/*
 *
 * Shortcuts. These are the tasks you should use.
 *
 */

// Initial build. Run this once before starting development.

gulp.task('initial', function() {

    seq('clean', 'output-js', 'output-js-modules', 'output-sass', 'output-html', 'shim', 'copy-assets', 'copy-media', 'styleguide', 'output-modules', function(){

        // We use a timeout around this because the styleguide and modules tasks
        // don't return a stream, so Gulp doesn't know when they are finished.
        setTimeout(function(){
            exec('gulp output-docs'); // render the index
        }, 100);

        console.log("Initial task finished. Now run 'gulp dev' to start developing.");

    });

});

// Run this when you want to start developing.

gulp.task('dev', function() {
    seq('api-start', 'watch', 'browserify', 'browser-sync');
});

// Build project

gulp.task('build', function() {
    seq('copy-www-static', 'copy-www-media', 'minify', 'inline', function(){
        process.exit(0);
    });
});

// Render the styleguide

gulp.task('styleguide', ['output-styleguide', 'output-sass-styleguide']);

// Work on the styleguide

gulp.task('styleguide-dev', ['styleguide', 'watch-styleguide', 'watch-styleguide-sass', 'browser-sync']);

// Test and lint code. Please note that the test-js task runs on the /www/ folder (for now).

gulp.task('test', function() {
    seq('lint-js', 'lint-sass', 'test-js', function(){
        console.log('Test completed.')
        process.exit(0);
    });
});