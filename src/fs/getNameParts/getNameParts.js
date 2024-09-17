"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameParts = void 0;
var getNameParts = function (fileName) {
    var splittedName = fileName.split('.');
    if (splittedName.length < 2)
        return null;
    var ext = splittedName.pop();
    if (!ext)
        return null;
    var name = splittedName.join('.');
    return {
        name: name,
        ext: ext,
    };
};
exports.getNameParts = getNameParts;
