"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCallable = void 0;
// @ts-expect-error untyped library
var is_callable_1 = require("is-callable");
var isCallable = function (value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return (0, is_callable_1.default)(value);
};
exports.isCallable = isCallable;
