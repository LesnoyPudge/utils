"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shallowEqual = void 0;
var shallow_equal_1 = require("shallow-equal");
var shallowEqual = function (a, b) {
    if (typeof a !== typeof b)
        return false;
    if (typeof a === 'object' && typeof b === 'object') {
        return (0, shallow_equal_1.shallowEqual)(a, b);
    }
    return a === b;
};
exports.shallowEqual = shallowEqual;
