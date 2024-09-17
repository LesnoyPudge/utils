"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
var pick = function (source) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var output = keys.reduce(function (acc, cur) {
        acc[cur] = source[cur];
        return acc;
    }, {});
    return output;
};
exports.pick = pick;
