"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strFormat = void 0;
var strFormat = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return values.map(function (v) { return v.trim(); }).join(' ');
};
exports.strFormat = strFormat;
