var gulp = require('gulp'),
    del = require('del');

module.exports = function() {

    // empty and remove www and tmp directories
    var src = [];
        src.push(config.roots.www);
        src.push(config.roots.tmp);
        src.push(config.roots.dest);

    del(src);

};