"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinFlip = void 0;
var _root_1 = require("@root");
var coinFlip = function () {
    return !!(0, _root_1.inRange)(0, 1);
};
exports.coinFlip = coinFlip;
