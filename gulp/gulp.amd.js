var gulp = require('gulp'),
    concat = require('gulp-concat'),
    amdOptimize = require('gulp-amd-optimize');

module.exports = function(){

    var dir = config.roots.src + '/' + config.paths.static + '/' + config.paths.ui,
        files = dir + '/**/*',
        dest = config.roots.www + '/' + config.paths.static + '/' + config.paths.ui;

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
                    'objects': '05-objects',
                    'components': '06-components',
                    'modules': '07-modules'
                },
                "baseUrl": dir
            }))
            .pipe(concat(module + '.js'))
            .pipe(gulp.dest(dest));
    });

};