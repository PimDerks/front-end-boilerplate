"use strict";

var module = require("./Component");

describe("test", function (){

    var instance;

    beforeEach(function(){
        var node = document.createElement('div');
        instance = new module(node);
    });

    it("should be true", function (){
        var bool = true;
        assert.isTrue(bool);
    });

});