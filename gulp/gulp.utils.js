var path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    fse = require('fs-extra'),
    jsonfile = require('json-file'),
    mkdirp = require('mkdirp'),
    dirname = path.dirname;

module.exports = {

    writeFile: function(path, contents, cb){
        mkdirp(dirname(path), function (err) {
            if (err){
                return cb(err)
            }
            fs.writeFile(path, contents, cb);
        });
    },

    walk: function(currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function(name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                module.exports.walk(filePath, callback);
            }
        });
    },

    getExtension: function(file){
        return file.substr((~-file.lastIndexOf(".") >>> 0) + 2);
    },

    stripExtension: function(file){
        var ext = '.' + module.exports.getExtension(file);
        return file.replace(ext, '');
    },

    getFileName:function(file){
        // remove extension
        return path.basename(file);
    }

};