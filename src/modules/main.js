'use strict';

// require monitors for conditioner
require('./base/js/00-vendor/conditioner/monitors/connection');
require('./base/js/00-vendor/conditioner/monitors/element');
require('./base/js/00-vendor/conditioner/monitors/media');
require('./base/js/00-vendor/conditioner/monitors/pointer');
require('./base/js/00-vendor/conditioner/monitors/window');

// require modules/components
require('./base/components/Component/js/Component');

var Conditioner = require('./base/js/00-vendor/conditioner/conditioner'),
    modernizr = require('./base/js/00-vendor/modernizr/modernizr');

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
        }
    }
});

Conditioner.init(config.conditioner);
