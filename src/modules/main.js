var Conditioner = require('./base/js/00-vendor/conditioner/conditioner'),
    modernizr = require('./base/js/00-vendor/modernizr/modernizr'),
    component = require('./base/components/Component/js/Component'),
    component2 = require('./base/components/Component/js/Component2'),
    monitor1 = require('./base/js/00-vendor/conditioner/monitors/connection'),
    monitor2 = require('./base/js/00-vendor/conditioner/monitors/element'),
    monitor3 = require('./base/js/00-vendor/conditioner/monitors/media'),
    monitor4 = require('./base/js/00-vendor/conditioner/monitors/pointer'),
    monitor5 = require('./base/js/00-vendor/conditioner/monitors/window');

Conditioner.setOptions({
    paths:{
        monitors:'./base/js/00-vendor/conditioner/monitors/'
    },
    loader:{
        require:function(paths,callback){
            var module = require(paths);
            callback(module);
        },
        config:function(path,options){

        },
        toUrl:function(path){
            // return requirejs.toUrl(path)
        }
    }
});

Conditioner.init();
