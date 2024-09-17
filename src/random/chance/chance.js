"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chance = void 0;
var chance = function (probability) {
    return Math.random() < probability;
};
exports.chance = chance;
