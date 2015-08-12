var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('./gulp.config'),
    plumber = require('gulp-plumber');

module.exports.copy = function() {

    var src = [];
    src.push(config.roots.src + '/' + config.paths.static + '/' + config.paths.sass + '/*.scss');

    var dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.css;

    // all files in root of /scss/
    return gulp.src(src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 1 version', '> 5%', 'ie 9'))
        .pipe(sourcemaps.write('.'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dest));

};

module.exports.lint = function(){

    var src = [];
    src.push(config.roots.src + '/**/*.scss');
    src.push('!' + config.roots.src + '/' + config.paths.modules + '/base/scss/03-base/_normalize.scss');

    return gulp.src(src)
        .pipe(scsslint({
            'config': './.scss-lint.yml',
            'maxBuffer': 1024*1024
        }));

};

module.exports.watch = function(){

    // watch sass files
    gulp.watch(config.roots.src + '/**/*.scss', ['sass']);

};