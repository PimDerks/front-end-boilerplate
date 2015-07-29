(function(){

    requirejs.config({
        "paths": {
            "conditioner": 'vendor/rikschennink/conditioner',
            "modernizr": 'vendor/paulirish/modernizr'
        },
        "shim": {
            "modernizr": {
                exports: 'window.Modernizr'
            }
        }
    });

    // Use when loading the conditioner config from a separate file (not preferred!)

    /*
    require(['config', 'modernizr', 'conditioner'], function(config, Modernizr, Conditioner){
        Conditioner.init(config);
    }); */

    require(['modernizr', 'conditioner'], function(Modernizr, Conditioner){
        Conditioner.init(window.config.conditioner);
    });

}());