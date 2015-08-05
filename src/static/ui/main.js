(function() {

    'use strict';

    // fixed paths, these should not differ between FED/DEV/TEST/PROD

    requirejs.config({
        'paths': {
            'conditioner': 'vendor/conditioner/conditioner',
            'modernizr': 'vendor/modernizr/modernizr'
        },
        'shim': {
            'modernizr': {
                exports: 'window.Modernizr'
            }
        }
    });

    // Use when loading the conditioner config from a separate file (not preferred!)

    /*
    require(['config', 'modernizr', 'conditioner'], function(config, Modernizr, Conditioner){
        Conditioner.init(config);
    }); */

    // Use when loading the conditioner config from a global variable (preferred!)

    require(['modernizr', 'conditioner'], function(Modernizr, Conditioner) {
        Conditioner.init(window.config.conditioner);
    });

}());