var gulp = require('gulp'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize');

module.exports = function(){

    var dir = config.roots.src
        files = dir + '/**/*.js',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.js;

    // Modules to compile. We must use the actual file path here.
    var modules = ["main", "07-modules/Module/js/Module"];

    modules.forEach(function(module){
        gulp.src(files)
            .pipe(amdOptimize(module, {
                "paths": {
                    "conditioner": 'vendor/conditioner/conditioner',
                    "modernizr": 'vendor/modernizr/modernizr',
                    'utils': '01-utils',
                    'base': '03-base',
                    'generic': '04-generic',
                    'objects': 'empty:', // ignore entire folder
                    'components': '06-components',
                    'modules': '07-modules'
                },
                "baseUrl": dir,
                "exclude": ['05-objects/js/Object'] // again, we need to use the original path structure here
            }))
            .pipe(concat(module + '.js'))
            .pipe(gulp.dest(dest));
    });

};