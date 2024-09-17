"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
var _root_1 = require("@root");
var throttle = function (fn, delayMS) {
    var lastArgs;
    var isBlocked = false;
    var isCalledDuringBlock = false;
    var timeoutId;
    var block = function (resolve) {
        if (resolve === void 0) { resolve = _root_1.noop; }
        isBlocked = true;
        timeoutId = setTimeout(function () {
            isBlocked = false;
            resolve();
            if (isCalledDuringBlock) {
                fn.apply(void 0, lastArgs);
                block();
            }
        }, delayMS);
    };
    var reset = function () {
        clearTimeout(timeoutId);
        isBlocked = false;
        isCalledDuringBlock = false;
    };
    var wrappedFunc = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            if (!isBlocked) {
                fn.apply(void 0, args);
                block(resolve);
                return;
            }
            isCalledDuringBlock = true;
            lastArgs = args;
        });
    };
    var controls = {
        block: block,
        reset: reset,
    };
    return [
        wrappedFunc,
        controls,
    ];
};
exports.throttle = throttle;
