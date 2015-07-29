var gulp = require('gulp'),
    util = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize'),
    base64 = require('gulp-base64');

gulp.task('minify-css', function() {

    var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.css + '/*',
        dest = config.roots.www + '/' + config.paths.staticMin + '/' + config.paths.css;

    return gulp.src(src)
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dest));

});

gulp.task('amdOptimize', function(){

    var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.js + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    return gulp.src(src)
        .pipe(amdOptimize("main", {
            "paths": {
                "conditioner": 'vendor/rikschennink/conditioner',
                "modernizr": 'vendor/paulirish/modernizr'
            }
        }))
        .pipe(concat("index.js"))
        .pipe(gulp.dest(dest));

});

gulp.task('uglify', function() {

    var src = config.roots.www + '/' + config.paths.static + '/' + config.paths.js + '/*',
        dest = config.roots.www + '/' + config.paths.staticMin + '/' + config.paths.js;

    return gulp.src(src)
        .pipe(uglify())
        .pipe(gulp.dest(dest));

});

gulp.task('imagemin', function () {

    return gulp.src(config.roots.www + '/' + config.paths.static + '/' + config.paths.img + '/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.paths.assets));

});

gulp.task('base64', function(){

    var dir = config.roots.www + '/' + config.paths.static + '/' + config.paths.css;

    return gulp.src(dir + '/*.css')
        .pipe(base64({
            extensions: ['ttf', 'woff', 'woff2'],
            maxImageSize: 1024*1024 // max size in bytes
        }))
        .pipe(gulp.dest(dir));

});

module.exports = ['imagemin', 'amdOptimize', 'uglify', 'minify-css', 'base64'];