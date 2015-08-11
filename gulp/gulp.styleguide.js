var gulp = require('gulp'),
    swig = require('swig'),
    path = require('path'),
    config = require('./gulp.config'),
    utils = require('./gulp.utils'),
    fs = require('fs'),
    fse = require('fs-extra'),
    Promise = require('./gulp.promise'),
    htmlhint = require("gulp-htmlhint"),
    w3cjs = require('gulp-w3cjs');

var methods = {

    getComponentName: function(file){
        return path.basename(file).replace(path.extname(file), '');
    },

    getComponentHierarchy: function(file){

        // replace 'src/modules'
        file = file.replace(config.roots.src.replace('./', '') + path.sep + config.paths.modules + path.sep, '');

        // replace 'components'
        file = file.replace('components' + path.sep, '');

        // replace extension
        file = file.replace(path.extname(file), '');

        // split
        var split = file.split(path.sep);

        var obj = {
            'module': split[0],
            'component': split[1],
            'subcomponent': split[2]
        };

        // replace dirs
        return obj;

    },

    getData: function(file){

        var result;

        // get directory
        var base = path.dirname(file);

        // get filename
        var name = methods.getComponentName(file);

        // expected .json file
        var json = path.join(base, name + '.json');

        // check if path exists
        return fs.existsSync(json) ? json : null;

    },

    getDependencies: function(file, dir){

        var result = [];

        // get directory
        var base = path.dirname(file);

        // get subdirectory
        var subdir = path.join(base, dir);

        if(fs.existsSync(subdir)){

            // read files from subdirectory
            utils.walk(subdir, function(f){
                result.push(f);
            });

        }

        return result;

    },

    getComponents: function(){

        var result = [];

        utils.walk(path.join(config.roots.src, config.paths.modules), function(file){

            if(path.extname(file) === '.swig'){

                var obj = {};

                // get component name
                obj['name'] = methods.getComponentName(file);

                // remove directories from path
                obj['hierarchy'] = methods.getComponentHierarchy(file);

                // dependencies
                obj['deps'] = {};

                // get related JavaScript
                obj['deps']['js'] = methods.getDependencies(file, config.paths.js);

                // get related SCSS
                obj['deps']['css'] = methods.getDependencies(file, config.paths.sass);

                // get expected data-format
                obj['data'] = methods.getData(file);

                console.log(obj);

            }

        });

        return result;

    }

};

module.exports = function() {

    methods.getComponents();

};