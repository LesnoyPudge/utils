"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHex = void 0;
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
var rgbToHex = function (rgb) {
    return '#' + ((1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2])
        .toString(16)
        .slice(1));
};
exports.rgbToHex = rgbToHex;
