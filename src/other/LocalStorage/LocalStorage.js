"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var _root_1 = require("@root");
var externalListeners;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        var _this = this;
        if (externalListeners === undefined) {
            externalListeners = new _root_1.ListenerStore();
        }
        this.listeners = externalListeners;
        this.cleanupCallback = (0, _root_1.addEventListener)(window, 'storage', function (e) {
            // clear event
            if (e.key === null)
                return _this.clear();
            // remove event
            if (e.newValue === null) {
                return _this.remove(e.key);
            }
            // @ts-expect-error
            _this.set(e.key, (0, _root_1.parseJSON)(e.newValue));
        });
    }
    LocalStorage.prototype.cleanup = function () {
        this.cleanupCallback();
    };
    LocalStorage.prototype.set = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        this.listeners.trigger(key, value);
    };
    LocalStorage.prototype.get = function (key, defaultValue) {
        var rawValue = localStorage.getItem(String(key));
        if (rawValue === null) {
            if (defaultValue !== undefined) {
                this.set(key, defaultValue);
            }
            // @ts-expect-error
            return defaultValue;
        }
        var value = (0, _root_1.parseJSON)(rawValue);
        if (value === undefined) {
            if (defaultValue !== undefined) {
                this.set(key, defaultValue);
            }
            // @ts-expect-error
            return defaultValue;
        }
        return value;
    };
    LocalStorage.prototype.remove = function (key) {
        localStorage.removeItem(key);
        this.listeners.trigger(key, undefined);
    };
    LocalStorage.prototype.clear = function () {
        localStorage.clear();
        this.listeners.triggerAll(undefined);
    };
    LocalStorage.prototype.onChange = function (key, callback) {
        // @ts-expect-error
        return this.listeners.add(key, callback);
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
