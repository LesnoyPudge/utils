"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRgb = void 0;
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
var hexToRgb = function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return String(r + r + g + g + b + b);
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result)
        return null;
    return [
        parseInt(result[1] || '0', 16),
        parseInt(result[2] || '0', 16),
        parseInt(result[3] || '0', 16),
    ];
};
exports.hexToRgb = hexToRgb;
