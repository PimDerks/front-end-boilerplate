function Promise() {

    this.then = function (handler) {
        this.thenHandler = handler;
        return this;
    };

    this.error = function (handler) {
        this.errorHandler = handler;
        return this;
    };

}

Promise.defer = function () {

    var promise = new Promise();

    return {
        resolve: function (data) {
            if (promise.thenHandler) promise.thenHandler(data);
        },
        reject: function (data) {
            if (promise.errorHandler) promise.errorHandler(data);
        },
        promise: function () {
            return promise;
        }
    }

};

module.exports = Promise;