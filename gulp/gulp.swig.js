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

    copy: function(src, dest){

        var deferred = Promise.defer();

        fse.copy(src, dest, function(err){
            if(err){
                deferred.reject(err);
            }
            deferred.resolve();
        })

        return deferred.promise();

    },

    getPages: function(){

        var result = [];

        utils.walk(config.roots.tmp + '/' + config.paths.prototype, function(path){

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

        utils.walk(config.roots.src + '/' + config.paths.modules, function(path){

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
        utils.walk(config.roots.src + '/' + config.paths.data, function(path){

            var name = utils.stripExtension(utils.getFileName(path)),
                ext = utils.getExtension(path);

            if(ext === 'json'){
                // read file
                data.data[name] = JSON.parse(fs.readFileSync(path, 'utf8'));
            }

        });

        return data;

    },

    getMasterPageName: function(src){

        // read file
        var data = fs.readFileSync(src, { encoding: 'utf-8' });

        // check for template string
        var reg = new RegExp(config.regex.template),
            string = reg.exec(data);

        if(string){
            return string[0].replace(config.strings.templateStart, '').replace(config.strings.templateEnd, '');
        }

        console.log("No template defined in file: ."  + src);

        return false;

    },

    getRelativeTemplatePath: function(file, template){

        // get relative template path
        var pathToTemplate = config.roots.tmp + '/' + config.paths.layouts + '/' + template;

        // return relative path
        return path.relative(file.substr(0, file.lastIndexOf('/')), pathToTemplate)

    },

    setMasterPagePaths: function(){

        var deferred = Promise.defer();

        // get all .swig files
        var pages = methods.getPages(),
            count = pages.length,
            i = 0;

        // update extends-statement
        pages.forEach(function(page, index){

            methods.setMasterPagePath(page).then(function(){
                i++;
                // console.log("Succesfully set master page path in file:" + page);
                if(i === count) deferred.resolve();
            }).error(function(){
                i++;
                // console.log("Unable to set master page path in file:" + page);
                if(i === count) deferred.resolve();
            });

        });

        return deferred.promise();

    },

    readPageContent: function(file){

        var deferred = Promise.defer();

        fs.readFile(file, 'utf8', function(err, content) {

            if (err) {
                console.log('Cannot read file: ' + file);
                deferred.reject();
            }

            // replace
            deferred.resolve(content);

        });

        return deferred.promise();

    },

    setMasterPagePath: function(file){

        var deferred = Promise.defer();

        // get template file name
        var template = methods.getMasterPageName(file);

        // get relative path
        var relative = methods.getRelativeTemplatePath(file, template);

        // update file contents
        methods.readPageContent(file).then(function(content){

            // replace
            content = content.replace(template, relative);

            if(!template){
                deferred.reject();
                return;
            }

            // write relative template path to temp file
            utils.writeFile(file, content, function(err){

                if(err){
                    deferred.reject();
                }

                deferred.resolve();

            });

        });

        // write file
        return deferred.promise();

    },

    renderComponents: function(){

        var components = methods.getComponents();

        components.forEach(function(component, index){
            methods.renderSwigFile(component, config.roots.tmp);
            if(index === (components.length - 1)){
                console.log('Succesfully rendered ' + components.length + ' components.');
            }
        });

    },

    renderPrototype: function(){

        var pages = methods.getPages();

        pages.forEach(function(page, index){
            methods.renderSwigFile(page, config.roots.www);
            if(index === (pages.length - 1)){
                console.log('Succesfully rendered ' + pages.length + ' pages.');
            }
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

        // strip /tmp/ dir from filename
        var removeDir = config.roots.tmp.replace('./','');
        name = name.replace(removeDir + '/', '');

        // strip /src/ dir from filename
        var removeDir2 = config.roots.src.replace('./','');
        name = name.replace(removeDir2 + '/', '');

        // write rendered template to file

        var dest = targetDir ? targetDir : config.roots.www;

        utils.writeFile(dest + '/' + name + '.html', swiggedContent, function(err){
            if(err){
                // console.log("Unable to render component: " + src);
                return;
            }

            // console.log("Succesfully rendered component: " + src);

        });

    }

};

module.exports.copy = function() {

    methods.copy(config.roots.src, config.roots.tmp).then(function(){

        methods.renderComponents();

        methods.setMasterPagePaths().then(function () {

            // log
            console.log('Rendering pages...');

            // render templates
            methods.renderPrototype();

        }).error(function () {
        });

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
    src.push(config.roots.src + '/' + config.paths.layouts + '/**/*');
    src.push(config.roots.src + '/' + config.paths.includes + '/**/*');
    src.push(config.roots.src + '/' + config.paths.modules + '/**/*.swig');

    // content + data
    src.push(config.roots.src + '/' + config.roots.prototype + '/**/*');
    src.push(config.roots.src + '/' + config.roots.data + '/**/*');

    // watch data
    gulp.watch(src, ['html']);

};