"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedResizeObserver = void 0;
var _root_1 = require("@root");
var SharedResizeObserver = /** @class */ (function () {
    function SharedResizeObserver() {
        var _this = this;
        this.listeners = new _root_1.ListenerStore();
        this.observer = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                _this.listeners.trigger(entry.target, entry);
            });
        });
        (0, _root_1.autoBind)(this);
    }
    SharedResizeObserver.prototype.observe = function (element, listener, options) {
        this.listeners.add(element, listener);
        this.observer.observe(element, options);
    };
    SharedResizeObserver.prototype.unobserve = function (element, listener) {
        this.listeners.remove(element, listener);
        this.observer.unobserve(element);
    };
    SharedResizeObserver.prototype.disconnect = function () {
        this.observer.disconnect();
    };
    return SharedResizeObserver;
}());
exports.SharedResizeObserver = SharedResizeObserver;
