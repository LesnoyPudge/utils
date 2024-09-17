"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = void 0;
var parseJSON = function (json, reviver) {
    try {
        return JSON.parse(json, reviver);
    }
    catch (error) {
        return undefined;
    }
};
exports.parseJSON = parseJSON;
