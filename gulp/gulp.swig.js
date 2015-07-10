var gulp = require('gulp'),
    cache = require('gulp-cached');
    swig = require('swig'),
    path = require('path'),
    config = require('./gulp.config'),
    utils = require('./gulp.utils'),
    fs = require('fs'),
    fse = require('fs-extra'),
    Promise = require('./gulp.promise');

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

        utils.walk(config.paths.tmp, function(path){

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
        utils.walk('content/data', function(path){

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
        var pathToTemplate = config.paths.templates + '/' + template;

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
                console.log("Succesfully set master page path in file:" + page);
                if(i === count) deferred.resolve();
            }).error(function(){
                i++;
                console.log("Unable to set master page path in file:" + page);
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

    renderPages: function(){

        var pages = methods.getPages();

        pages.forEach(function(page){
            methods.renderPage(page);
        });

    },

    renderPage: function(src){

        // strip extension from file
        var name = src.substr(0, src.indexOf('.swig')),
            json = name + '.json';

        // get site-wide data
        var data = methods.getData();

        // check is a JSON file exists with the same file
        var page = fse.readJsonSync(json, { throws: false });

        if(page){
            data.data[page] = page;
        }

        // invalidate the swig cache
        swig.invalidateCache();

        // render template using swig
        var swiggedContent = swig.renderFile(src, data);

        // write rendered template to file
        utils.writeFile(config.paths.www + '/' + name + '.html', swiggedContent, function(err){
            if(err){
                console.log("Unable to render page: " + src);
                return;
            }

            console.log("Succesfully rendered page: " + src);
        });

    }

};

module.exports = function() {

    var swigFiles = [];

    // copy all files to temp
    methods.copy(config.paths.content, config.paths.tmp).then(function() {

        methods.setMasterPagePaths().then(function () {

            // render templates
            methods.renderPages();

        }).error(function(){

        });

    });

};
