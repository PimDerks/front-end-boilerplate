<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
    <head>
        <title>Blaat.</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/static/assets/icons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/static/assets/icons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/static/assets/icons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/static/assets/icons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/static/assets/icons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/static/assets/icons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/static/assets/icons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/static/assets/icons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/assets/icons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="/static/assets/icons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/static/assets/icons/favicon-194x194.png" sizes="194x194">
        <link rel="icon" type="image/png" href="/static/assets/icons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/static/assets/icons/android-chrome-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="/static/assets/icons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/static/assets/icons/manifest.json">
        <link rel="shortcut icon" href="/static/assets/icons/favicon.ico">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="/static/assets/icons/mstile-144x144.png">
        <meta name="msapplication-config" content="/static/assets/icons/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">

        <!-- Open Graph Data -->
        <meta property="og:site_name" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <!-- /Open Graph Data -->

        <link rel="stylesheet" href="/static/css/screen.css" />
        <style>
            * {
                font-family: Roboto, "Comic Sans MS", serif;
            }
        </style>
    </head>
    <body>
        <p>Template</p>

        {% block content %}
            Placeholder for content.
        {% endblock %}

        <h1>Data</h1>

        {% for x in data %}
            <ul>
                <li>{{ loop.key }}
                    <ul>
                    {% for y in x %}
                        <li>{{ y }}</li>
                    {% endfor %}
                    </ul>
                </li>
            </ul>
        {%  endfor %}

        <p>Template</p>

        <div data-module="ui/Test"></div>
        <script src="/static/js/vendor/filamentgroup/loadcss.js"></script>
        <!--[if IE 9]>
            <script src="/static/js/shim.js"></script>
        <![endif]-->
        <script>
            (function(window, undefined){

                var d = window.document;

                // cutting da mustardz
                if (!('querySelector' in d && 'addEventListener' in window)) {
                    return;
                }

                var config = {

                    // cache bust
                    version: (new Date().getTime()),

                    // location of conditioner config (when using a separate request)
                    // conditioner: '/static/js/config',

                    // config for conditioner, ideally should be inline to avoid extra request
                    conditioner: {
                        'paths': {
                            'monitors': './vendor/rikschennink/monitors/'
                        },
                        'modules': {
                            'ui/Test': {}
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
                        main: "main" // gets prefixed with scripts.dir
                    }

                },

                // global var 'require' is automatically used for requireJS initialisation
                require = {
                    "baseUrl": config.scripts.dir,
                    "urlArgs": "bust=" +  config.version,
                    "paths":{
                        // "config": config.conditioner
                    },
                    map:{
                        '*':{
                            conditioner:'vendor/rikschennink/conditioner'
                        }
                    },
                    "shim": {
                        "conditioner": {
                            // "deps": ["config"]
                        }
                    }
                };

                /*!
                 loadCSS: load a CSS file asynchronously.
                 [c]2014 @scottjehl, Filament Group, Inc.
                 Licensed MIT
                 */

                /* exported loadCSS */
                function loadCSS( href, before, media, callback ){
                    "use strict";
                    // Arguments explained:
                    // `href` is the URL for your CSS file.
                    // `before` optionally defines the element we'll use as a reference for injecting our <link>
                    // By default, `before` uses the first <script> element in the page.
                    // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
                    // If so, pass a different reference element to the `before` argument and it'll insert before that instead
                    // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
                    var ss = window.document.createElement( "link" );
                    var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
                    var sheets = window.document.styleSheets;
                    ss.rel = "stylesheet";
                    ss.href = href;
                    // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
                    ss.media = "only x";
                    // DEPRECATED
                    if( callback ) {
                        ss.onload = callback;
                    }

                    // inject link
                    ref.parentNode.insertBefore( ss, ref );
                    // This function sets the link's media back to `all` so that the stylesheet applies once it loads
                    // It is designed to poll until document.styleSheets includes the new sheet.
                    ss.onloadcssdefined = function( cb ){
                        var defined;
                        for( var i = 0; i < sheets.length; i++ ){
                            if( sheets[ i ].href && sheets[ i ].href === ss.href ){
                                defined = true;
                            }
                        }
                        if( defined ){
                            cb();
                        } else {
                            setTimeout(function() {
                                ss.onloadcssdefined( cb );
                            });
                        }
                    };
                    ss.onloadcssdefined(function() {
                        ss.media = media || "all";
                    });
                    return ss;
                }

                // Custom font loading to avoid FOUT: https://www.filamentgroup.com/lab/font-loading.html
                var supportsWoff2 = (function(win){
                    if(!("FontFace" in win)) {
                        return false;
                    }
                    var f = new win.FontFace( "t", 'url("data:application/font-woff2,") format("woff2")', {} );
                    f.load().catch(function() {});
                    return f.status == 'loading';
                })(window);

                // load font (woff)
                var ua = navigator.userAgent,
                    fontFileUrl = config.fonts.woff;;

                if(supportsWoff2) {
                    fontFileUrl = config.fonts.woff2;
                } else if( ua.indexOf( "Android" ) > -1 && ua.indexOf( "like Gecko" ) > -1 && ua.indexOf( "Chrome" ) === -1 ){
                    fontFileUrl = config.fonts.ttf;
                }

                loadCSS(fontFileUrl);

                // insert requireJS
                d.addEventListener('DOMContentLoaded', function() {

                    // load requirejs
                    var s = d.createElement('script');
                    s.setAttribute('src', config.scripts.requirejs);
                    s.setAttribute('data-main', 'main');
                    d.body.appendChild(s);

                });

            }(this));
        </script>
    </body>
</html>