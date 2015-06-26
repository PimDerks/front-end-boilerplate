module.exports = (function(){

    return {

        // path
        paths: {
            sass: './src/static/scss',
            css: './src/static/css',
            content: './content/pages',
            www: './www',
            templates: './src/templates',
            tmp: './tmp'
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