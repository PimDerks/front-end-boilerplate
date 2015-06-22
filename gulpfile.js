var gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    connect = require('gulp-connect'),
    exec = require('child_process').exec,
    swig = require('swig'),
    _ = require('lodash'),
    fs = require('fs'),
    fse = require('fs-extra'),
    jsonfile = require('json-file'),
    mkdirp = require('mkdirp'),
    dirname = path.dirname;

// path
var paths = {
    sass: './src/static/scss',
    css: './src/static/css',
    content: './content/pages',
    www: './www',
    templates: './src/templates',
    tmp: './tmp'
};

// regex
var regex = {
    template: "{\\% extends '[a-z]+\\.swig' \\%}"
};

// strings to replace
var strings = {
    templateStart: "{% extends '",
    templateEnd: "' %}"
};

function writeFile (path, contents, cb) {
    mkdirp(dirname(path), function (err) {
        if (err){
            return cb(err)
        }
        fs.writeFile(path, contents, cb);
    })
};

function walk(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walk(filePath, callback);
        }
    });
}

function getExtension(file){
    return file.substr((~-file.lastIndexOf(".") >>> 0) + 2);
}

function stripExtension(file){
    var ext = '.' + getExtension(file);
    return file.replace(ext, '');
}

function getFileName(file){
    // remove extension
    return path.basename(file);
}

function getTemplateNameFromFile(file){

    // read file
    var data = fs.readFileSync(file, { encoding: 'utf-8' });

    // check for template string
    var reg = new RegExp(regex.template),
        string = reg.exec(data);

    if(string){
        return string[0].replace(strings.templateStart, '').replace(strings.templateEnd, '');
    }

    return false;

}

function getData(){
    var data = {
        data: {}
    };

    // get data files
    walk('content/data', function(path, stat){

        var name = stripExtension(getFileName(path)),
            ext = getExtension(path);

        if(ext === 'json'){
            // read file
            data.data[name] = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

    });

    return data;

}

// sass
gulp.task('sass', function() {
    return gulp.src(paths.sass + '/screen.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 1 version', '> 5%', 'ie 9'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

// swig
gulp.task('swig', function(){

    var swigFiles = [];

    // copy all files to temp
    fse.copy(paths.content, paths.tmp, function(err, success){

        if(err){
            return;
        }

        // loop through all files
        walk(paths.tmp, function(path, stat){

            var ext = getExtension(path);

            switch(ext){
                case 'swig':
                    swigFiles.push(path);
            }

        });

        // loop through all swig files
        swigFiles.forEach(function(file){

            // strip extension from file
            var name = file.substr(0, file.indexOf('.swig')),
                json = name + '.json';

            // get site-wide data
            var data = getData();

            // check is a JSON file exists with the same file
            var page = fse.readJsonSync(json, { throws: false });

            if(page){
                data.data[page] = page;
            }

            // invalidate the swig cache
            swig.invalidateCache();

            // get template file name
            var template = getTemplateNameFromFile(file);

            if(!template){
                console.log("No template defined in file: ."  + file);
                return;
            }

            // get relative template path
            var pathToTemplate = paths.templates + '/' + template;

            // replace extends statement in file
            var text = fs.readFile(file, 'utf8', function(err, content){

                if(err){
                    console.log('Cannot read file: ' + file);
                }

                // replace
                content = content.replace(template, path.relative(file.substr(0, file.lastIndexOf('/')), pathToTemplate));

                // write relative template path to temp file
                writeFile(file, content, function(err){
                    if(err){
                        console.log('Unable to write file:' + file);
                    }

                    // render template using swig
                    var swiggedContent = swig.renderFile(file, data);

                    // write rendered template to file
                    writeFile(paths.www + '/' + name + '.html', swiggedContent, function(){});

                });

            });

        });


    });


});

// watch
gulp.task('watch', function() {

    // watch content
    gulp.watch(paths.content + '/**/*', ['swig']);

    // watch sass files
    gulp.watch(paths.sass + '/**/*',['sass']);

});

// serve
gulp.task('serve', function(){

    connect.server({
        root: ['www'],
        port: 1337
    });

});

// dev
gulp.task('dev', ['swig', 'watch', 'serve'], function() {

    browserSync.init({
        proxy: "http://localhost:1337"
    });

});