<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
    <head>
        <title>Blaat.</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="/icons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/icons/favicon-194x194.png" sizes="194x194">
        <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/icons/android-chrome-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="/icons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/icons/manifest.json">
        <link rel="shortcut icon" href="/icons/favicon.ico">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png">
        <meta name="msapplication-config" content="/icons/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">

        <!-- Open Graph Data -->
        <meta property="og:site_name" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <!-- /Open Graph Data -->

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
        <script>

            var config = {

                // cache bust
                version: (new Date().getTime()),

                // location of conditioner config
                conditioner: "/static/js/config",

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
                    "config": config.conditioner
                },
                "shim": {
                    "conditioner": {
                        "deps": ["config"]
                    }
                }
            };

            (function(window, undefined){

                var d = window.document;

                // cutting da mustardz
                if (!('querySelector' in d && 'addEventListener' in window)) {
                    return;
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