"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEventListener = void 0;
var removeEventListener = function (element, eventName, fn) {
    element.removeEventListener(String(eventName), fn);
};
exports.removeEventListener = removeEventListener;
