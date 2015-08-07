module.exports = (function(){

    return {

        // roots
        roots: {
            src: './src',
            www: './www',
            tmp: './tmp',
            dest: './dest'
        },

        // path
        paths: {
            prototype: 'prototype',
            data: 'data',
            modules: 'modules',
            ui: 'ui',
            assets: 'assets',
            static: 'static',
            staticMin: 'static-min',
            sass: 'scss',
            css: 'css',
            js: 'js',
            includes: 'includes',
            img: 'img',
            fonts: 'fonts',
            icons: 'icons',
            layouts: 'layouts',
            shim: 'shim',
            media: '_media'
        },

        // server
        server: {
            port: 4444
        },

        // regex
        regex: {
            template: "{\\% extends '[a-z]+\\.swig' \\%}"
        },

        // strings to replace
        strings: {
            templateStart: "{% extends '",
            templateEnd: "' %}"
        }

    }

}());