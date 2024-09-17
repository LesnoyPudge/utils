"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEventListener = void 0;
var _root_1 = require("@root");
var addEventListener = function (element, eventName, fn, options) {
    element.addEventListener(String(eventName), fn, options);
    return function () { return (0, _root_1.removeEventListener)(element, eventName, fn); };
};
exports.addEventListener = addEventListener;
