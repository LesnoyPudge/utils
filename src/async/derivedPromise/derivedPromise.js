"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derivedPromise = void 0;
var _root_1 = require("@root");
var derivedPromise = function (executor) {
    var resolve = _root_1.noop;
    var reject = _root_1.noop;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
        (executor !== null && executor !== void 0 ? executor : _root_1.noop)(res, rej);
    }).finally(function () {
        resolve = _root_1.noop;
        reject = _root_1.noop;
    });
    var controls = {
        resolve: resolve,
        reject: reject,
    };
    return [
        promise,
        controls,
    ];
};
exports.derivedPromise = derivedPromise;
