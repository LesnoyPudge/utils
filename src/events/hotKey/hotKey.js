"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotKey = void 0;
var _root_1 = require("@root");
var matcher = function (keyCombo) {
    return function (e) {
        var _a;
        var activeKeys = Array.from(new Set([
            e.altKey && _root_1.KEY.Alt.toLowerCase(),
            e.ctrlKey && _root_1.KEY.Control.toLowerCase(),
            e.shiftKey && _root_1.KEY.Shift.toLowerCase(),
            e.metaKey && _root_1.KEY.Meta.toLowerCase(),
            e.key.toLowerCase(),
        ].filter(Boolean)));
        if (activeKeys.length !== keyCombo.length)
            return false;
        var isMatch = ((_a = keyCombo.map(function (key) { return activeKeys.includes(key.toLowerCase()); })
            .find(function (res) { return !res; })) !== null && _a !== void 0 ? _a : true);
        return isMatch;
    };
};
var make = function () {
    var keyCombos = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keyCombos[_i] = arguments[_i];
    }
    return function (action, options) {
        return function (e) {
            var isMatch = keyCombos.map(function (keyCombo) {
                return matcher(keyCombo)(e);
            }).some(function (res) { return res; });
            if (!isMatch)
                return false;
            (options === null || options === void 0 ? void 0 : options.prevent) && e.preventDefault();
            (options === null || options === void 0 ? void 0 : options.stop) && e.stopPropagation();
            (options === null || options === void 0 ? void 0 : options.stopImmediate) && e.stopImmediatePropagation();
            action(e);
            return true;
        };
    };
};
var uniter = function (maxCalls) {
    return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return function (e) {
            var _a;
            var count = 0;
            var bail = count >= maxCalls;
            var event = (_a = e.nativeEvent) !== null && _a !== void 0 ? _a : e;
            handlers.forEach(function (handler) {
                if (bail)
                    return;
                var isHandled = handler(event);
                if (isHandled)
                    count++;
                bail = count >= maxCalls;
            });
            return !!count;
        };
    };
};
exports.hotKey = {
    make: make,
    many: uniter(Infinity),
    one: uniter(1),
    matcher: matcher,
};
