define([], function () {

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options || {};
        this._initialize();

    };

    exports.prototype = {

        /**
         * Initialize module.
         *
         * @memberof Test
         * @static
         * @private
         */

        _initialize: function () {
            console.log('init module');
        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof Test
         * @static
         * @public
         */

        unload: function () {

        }

    };

    return exports;

});