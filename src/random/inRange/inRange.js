"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inRange = void 0;
var inRange = function (min, max) {
    max = Math.floor(max);
    min = Math.ceil(min);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.inRange = inRange;
