"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
var clamp = function (firstBorder, current, secondBorder) {
    var min = Math.min(firstBorder, secondBorder);
    var max = Math.max(firstBorder, secondBorder);
    return Math.max(min, Math.min(max, current));
};
exports.clamp = clamp;
