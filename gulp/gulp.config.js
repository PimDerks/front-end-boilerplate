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
            static: 'static',
            staticMin: 'static-min',
            sass: 'scss',
            css: 'css',
            js: 'js',
            img: 'assets/img',
            fonts: 'assets/fonts',
            templates: 'templates'
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