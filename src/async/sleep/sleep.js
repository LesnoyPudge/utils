"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
var sleep = function (durationMS) {
    if (durationMS === void 0) { durationMS = 0; }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, durationMS);
    });
};
exports.sleep = sleep;
