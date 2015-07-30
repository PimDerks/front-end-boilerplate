var config = {

        // cache bust
        version: (new Date().getTime()),

        /* location of conditioner config (when using a separate request)

         define('config', function () {

         return {
         };

         }); */

        // conditioner: '/static/js/config',

        // config for conditioner, ideally should be inline to avoid extra request
        conditioner: {
            'paths': {
                'monitors': './vendor/rikschennink/monitors/'
            },
            'modules': {
                'ui/Test': {
                    "options": {
                        "key": "value"
                    }
                }
            }
        },

        // location of asynchronously loaded fonts
        fonts: {
            ttf: "/static/css/ttf.css",
            woff: "/static/css/woff.css",
            woff2: "/static/css/woff2.css"
        },

        // location of asynchronously loaded scripts
        scripts: {
            requirejs: "/static/js/vendor/jrburke/require.js", // src of requirejs lib
            dir: "/static/js/", // root of all scripts loaded via requirejs
            main: "main-build" // gets prefixed with scripts.dir
        }

    },

// global var 'require' is automatically used for requireJS initialisation
    require = {
        "baseUrl": config.scripts.dir,
        "urlArgs": "bust=" +  config.version,
        "paths":{
            // when using a separate request for conditioner config
            // "config": config.conditioner
        },
        map:{
            '*':{
                conditioner:'vendor/rikschennink/conditioner'
            }
        },
        "shim": {
            "conditioner": {
                // when using a separate request for conditioner config
                // "deps": ["config"]
            }
        }
    };