var gulp = require('gulp'),
    swig = require('swig'),
    gulpSwig = require('gulp-swig'),
    data = require('gulp-data'),
    markedSwig = require('swig-marked'),
    path = require('path'),
    config = require('./gulp.config'),
    utils = require('./gulp.utils'),
    fs = require('fs'),
    fm = require('front-matter');

    require('swig-highlight').apply(swig);

    markedSwig.useFilter(swig);
    markedSwig.useTag(swig);

module.exports.render = function() {

    var src = [];
    src.push(config.roots.src + '/' + config.paths.styleguide + '/**/*.swig');

    var dest = config.roots.www + '/' + config.paths.styleguide;

    function getPages(){

        var result = {
            pages: []
        };

        // read files from subdirectory
        var root = config.roots.src + '/' + config.paths.styleguide;
        utils.walk(root, function(f){

            if(path.extname(f) === '.swig'){

                var data = fs.readFileSync(f, 'utf8');

                // fill object
                var obj = {
                    url: f.replace('src/','/').replace('.swig','.html'),
                    fm: fm(data).attributes
                };

                result.pages.push(obj);

            }

        });

        return result;

    }

    return gulp.src(src)
        .pipe(gulpSwig({
            defaults: {
                cache: false
            },
            data: getPages()
        }))
        .pipe(gulp.dest(dest));

};

module.exports.watch = function() {

    var src = [];
    src.push(config.roots.src + '/' + config.paths.styleguide + '/**/*.swig');
    src.push(config.roots.src + '/' + config.paths.layouts + '/' + config.paths.styleguide + '/**/*.swig');

    gulp.watch(src, ['output-styleguide']);

};