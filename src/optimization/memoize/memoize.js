"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
var _root_1 = require("@root");
var memoize = function (fn, lifespan) {
    if (lifespan === void 0) { lifespan = Infinity; }
    var cache = new _root_1.Cache();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return cache.getOrSet(args, function () { return fn.apply(void 0, args); }, lifespan);
    };
};
exports.memoize = memoize;
