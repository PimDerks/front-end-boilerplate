/**
 * ConditionerJS Init
 */

define(['conditioner'], function (conditioner) { // 1. require conditioner
    'use strict';

    require(['config'], function(config){ // 2. require config (should be initialized already because it is a dependency of conditioner)

        conditioner.init(config);
    });

    require(['modernizr']);

});
