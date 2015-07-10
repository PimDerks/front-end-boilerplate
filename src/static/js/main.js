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

    require(['config', 'modernizr', 'conditioner'], function(config, Modernizr, Conditioner){
        console.log('init!', config, new Date());
        Conditioner.init(config);
    });

}());