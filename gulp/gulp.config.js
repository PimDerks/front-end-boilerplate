module.exports = (function(){

    return {

        // path
        paths: {
            sass: './src/static/scss',
            css: './src/static/css',
            js: './src/static/js',
            data: './content/data',
            content: './content/pages',
            assets: './src/static/assets/img',
            www: './www',
            templates: './src/templates',
            tmp: './tmp'
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