module.exports = (function(){

    return {

        // roots
        roots: {
            src: './src',
            www: './www',
            tmp: './tmp',
            dest: './dest',
            content: './content'
        },

        // data
        content: {
            pages: 'pages', // becomes roots.content + this
            data: 'data' // becomes roots.content + this
        },

        // path
        paths: {
            ui: 'ui',
            assets: 'assets',
            static: '_static',
            staticMin: '_static-min',
            sass: 'scss',
            css: 'css',
            js: 'js',
            includes: '_includes',
            img: 'assets/img',
            fonts: 'assets/fonts',
            templates: 'templates',
            shim: 'shim'
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