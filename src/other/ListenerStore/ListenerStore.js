"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerStore = void 0;
var ListenerStore = /** @class */ (function () {
    function ListenerStore() {
        this.store = new Map();
    }
    ListenerStore.prototype.add = function (key, listener) {
        var _this = this;
        var listeners = this.store.get(key);
        if (!listeners) {
            listeners = new Set();
            this.store.set(key, listeners);
        }
        listeners.add(listener);
        return function () { return _this.remove(key, listener); };
    };
    ListenerStore.prototype.remove = function (key, listener) {
        var listeners = this.store.get(key);
        if (!listeners)
            return;
        listeners.delete(listener);
        if (listeners.size === 0) {
            this.store.delete(key);
        }
    };
    ListenerStore.prototype.removeAll = function () {
        this.store.clear();
    };
    ListenerStore.prototype.trigger = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var listeners = this.store.get(key);
        if (!listeners)
            return;
        listeners.forEach(function (listener) {
            listener.apply(void 0, args);
        });
    };
    ListenerStore.prototype.triggerAll = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.store.forEach(function (value) {
            value.forEach(function (listener) {
                listener.apply(void 0, args);
            });
        });
    };
    ListenerStore.prototype.getSize = function () {
        var size = 0;
        this.store.forEach(function (value) {
            size += value.size;
        });
        return size;
    };
    return ListenerStore;
}());
exports.ListenerStore = ListenerStore;
