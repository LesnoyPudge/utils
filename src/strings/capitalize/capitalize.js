"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = void 0;
var capitalize = function (word) {
    if (!word)
        return word;
    return (word.charAt(0).toUpperCase() + word.slice(1));
};
exports.capitalize = capitalize;
