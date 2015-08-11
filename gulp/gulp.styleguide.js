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

    require('swig-highlight').apply(swig);

var methods = {

    getComponentName: function(file){
        return path.basename(file).replace(path.extname(file), '');
    },

    getDocumentation: function(file){

        var result;

        // get directory
        var base = path.dirname(file);

        // get filename
        var name = methods.getComponentName(file);

        // expected .json file
        var json = path.join(base, name + '.md');

        // check if path exists
        return fs.existsSync(json) ? json : null;

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

    getFile: function(file){
        var obj = {
          name: file,
          contents: fs.readFileSync(file, 'utf8')
        };
        return obj;
    },

    getDependencies: function(file, dir){

        var result = [];

        // get filename
        var filename = path.basename(file);
        filename = filename.replace(path.extname(filename), '');

        // get directory
        var base = path.dirname(file);

        // get component baseName
        var component = base.split(path.sep);
        component = component[component.length-1];

        // get subdirectory
        var subdir = path.join(base, dir);

        if(fs.existsSync(subdir)){

            // read files from subdirectory
            utils.walk(subdir, function(f){

                var temp = path.basename(f);
                temp = temp.replace(path.extname(temp), '');

                // base module gets all dependencies
                // submodules only get dependencies which match filename
                if(filename === component || temp === filename) {
                    var r = methods.getFile(f);
                    result.push(r);
                //
                }

            });

        }

        return result;

    },

    getComponent: function(c){

        var temp = {};

        // get component name
        temp['name'] = methods.getComponentName(c);

        // remove directories from path
        temp['hierarchy'] = methods.getComponentHierarchy(c);

        // dependencies
        temp['code'] = {};

        // get related JavaScript
        temp['code']['js'] = methods.getDependencies(c, config.paths.js);

        // get related SCSS
        temp['code']['css'] = methods.getDependencies(c, config.paths.sass);

        // get related SCSS
        temp['code']['html'] = [methods.getFile(c)];

        // get expected data-format
        temp['data'] = methods.getData(c)? methods.getFile(methods.getData(c)) : null;

        // get documentation
        temp['doc'] = methods.getDocumentation(c) ? methods.getFile(methods.getDocumentation(c)) : null;

        return temp;

    },

    getComponents: function(){

        var result = {},
            temp = {};

        utils.walk(path.join(config.roots.src, config.paths.modules), function(file){

            if(path.extname(file) === '.swig'){

                var obj = {};

                // get component baseName
                var base = path.dirname(file).split(path.sep);
                base = base[base.length-1];

                if(!temp[base]){
                    temp[base] = [];
                }

                temp[base].push(methods.getComponent(file));

            }

        });

        // loop through result
        result['components'] = [];
        for(var c in temp){

            var obj = {};
            obj['name'] = c;
            obj['sub'] = temp[c];
            result['components'].push(obj);

        }

        return result;

    },

    renderStyleguide: function(data){

        // template of styleguide
        var template = config.roots.styleguide + path.sep + 'index.swig';

        // invalidate the swig cache
        swig.invalidateCache();

        // render template using swig
        var swiggedContent = swig.renderFile(template, data);

        // write file
        utils.writeFile(path.join(config.roots.www, config.paths.styleguide, 'index.html'), swiggedContent, function(err){
            if(err){
                // console.log("Unable to render component: " + src);
                return;
            }

            // console.log("Succesfully rendered component: " + src);

        });

    }

};

module.exports.render = function() {

    var data = methods.getComponents();
    methods.renderStyleguide(data);

};

module.exports.watch = function() {

    gulp.watch(config.roots.styleguide + '/**/*', ['styleguide-render']);

};