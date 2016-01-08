<script src="/prototype/static/js/shim.js"></script>

<script src="/prototype/static/js/initial.js" data-inline></script>

<script>
    window.configURL = '/prototype/static/js/config-conditioner'; // set URL of conditioner configuration, to be used in RequireJS paths-config.

    var version = '0.7', // cache busting
            require = {
                "urlArgs": "v=" + version
            };
</script>
<script data-main="/prototype/static/js/main" src="/prototype/static/js/base/vendor/require/require.js"></script>
<script src="/prototype/static/js/config-require.js"></script>
<script>
    requirejs.config({
        // add mapping for config to prevent request to config.js file instead of dynamic file
        "paths": {
            "config": window.configURL
        },
        "shim": {
            "conditioner": {
                "deps": ["config"]
            }
        }
    });
</script>

<script>
    DEBUG = {
        A11Y: false, // load a11y helpers/warnings
        BASELINE: true, // show baseline toggle
        COUNT: false, // count CSS selectors/rules
        CSS: false // load debug CSS (baseline, ...)
    };
</script>
<script src="/prototype/static/js/debug.js"></script>