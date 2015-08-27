'use strict';

/**
 * Initialize module.
 * @param {element} element - The node (element) to load this module on.
 * @param {object} options - Options for this module.
 */
var exports = function(element, options) {

    console.log('This is the module we want to load.');
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
    _initialize: function() {
        console.log('Init that component 2 with options', this._options, 'on', new Date());
    },

    /**
     * Clean up when unloading this module.
     *
     * @memberof Test
     * @static
     * @public
     */
    unload: function() {

    }

};

module.exports = exports;