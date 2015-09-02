var gulp = require('gulp'),
    swig = require('swig'),
    path = require('path'),
    config = require('./gulp.config'),
    utils = require('./gulp.utils'),
    fs = require('fs'),
    fse = require('fs-extra'),
    // Promise = require('./gulp.promise'),
    htmlhint = require("gulp-htmlhint"),
    w3cjs = require('gulp-w3cjs');

var methods = {

    copy: function(src, dest){

        return new Promise(function(resolve, error){

            fse.copy(src, dest, function(err){
                if(err){
                    error();
                }
                resolve();
            })

        });

    },

    getPages: function(){

        var result = [];

        utils.walk(path.join(config.roots.tmp, config.paths.prototype), function(path){

            var ext = utils.getExtension(path);

            switch(ext) {
                case 'swig':
                    result.push(path);
            }

        });

        return result;

    },

    getComponents: function(){

        var result = [];

        utils.walk(path.join(config.roots.src, config.paths.modules), function(path){

            var ext = utils.getExtension(path);

            switch(ext) {
                case 'swig':
                    result.push(path);
            }

        });

        return result;

    },

    getData: function(src){

        var data = {
            data: {}
        };

        // get data files
        utils.walk(path.join(config.roots.src, config.paths.data), function(path){

            var name = utils.stripExtension(utils.getFileName(path)),
                ext = utils.getExtension(path);

            if(ext === 'json'){
                // read file
                data.data[name] = JSON.parse(fs.readFileSync(path, 'utf8'));
            }

        });

        return data;

    },

    renderComponents: function(){

        return new Promise(function(resolve, reject){

            var components = methods.getComponents();

            components.forEach(function(component, index){
                methods.renderSwigFile(component, config.roots.tmp);
                if(index === (components.length - 1)){
                    console.log('Succesfully rendered ' + components.length + ' components.');
                    setTimeout(function() {
                        resolve();
                    }, 10);
                }
            });

        });

    },

    renderPrototype: function(){

        return new Promise(function(resolve, reject){

            var pages = methods.getPages();

            pages.forEach(function (page, index) {
                methods.renderSwigFile(page, config.roots.www);
                if (index === (pages.length - 1)) {
                    console.log('Succesfully rendered ' + pages.length + ' pages.');
                    setTimeout(function() {
                        resolve();
                    });
                }
            });

        });

    },

    renderSwigFile: function(src, targetDir){

        // strip extension from file
        var name = src.substr(0, src.indexOf('.swig')),
            json = name + '.json';

        // get site-wide data
        var data = methods.getData() || {};

        // check is a JSON file exists with the same file in the same directory
        var local = fse.readJsonSync(json, { throws: false });
        if(local){
            data.data['local'] = local;
        }

        // invalidate the swig cache
        swig.invalidateCache();

        // render template using swig
        var swiggedContent = swig.renderFile(src, data);

        // strip /tmp/ dir from filename (ugly work around)
        var removeDir = config.roots.tmp.replace('./','');
        name = name.replace(removeDir + path.sep, '');

        // strip /src/ dir from filename (ugly work around)
        var removeDir2 = config.roots.src.replace('./','');
        name = name.replace(removeDir2 + path.sep, '');

        // write rendered template to file

        var dest = targetDir ? targetDir : config.roots.www;

        utils.writeFile(path.join(dest, name + '.html'), swiggedContent, function(err){
            if(err){
                // console.log("Unable to render component: " + src);
                return;
            }

            // console.log("Succesfully rendered component: " + src);

        });

    }

};

module.exports.copy = function() {

    methods.copy(config.roots.src, config.roots.tmp).then(function() {

        // log
        console.log('Rendering components...');

        // return promise
        return methods.renderComponents();

    }).then(function(){

        // log
        console.log('Rendering pages...');

        // return a promise render templates
        return methods.renderPrototype();

    }).catch(function(err){
        console.log("Error:", err);
    });

};

module.exports.lint = function(){
    return gulp.src(config.roots.www + '/**/*.html')
        .pipe(w3cjs())
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());

};

module.exports.watch = function(){

    var src = [];

    // swig
    src.push(config.roots.src + '/' + config.paths.prototype + '/**/*.swig');
    src.push(config.roots.src + '/' + config.paths.layouts + '/**/*.swig');
    src.push(config.roots.src + '/' + config.paths.modules + '/**/*.swig');

    // data
    src.push(config.roots.src + '/' + config.roots.data + '/**/*');

    // watch data
    gulp.watch(src, ['output-html']);

};