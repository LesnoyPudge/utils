"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedIntersectionObserver = void 0;
var _root_1 = require("@root");
var SharedIntersectionObserver = /** @class */ (function () {
    function SharedIntersectionObserver() {
        this.listeners = new _root_1.ListenerStore();
        this.observers = new _root_1.Cache();
        this.elementsToOptionsMap = new Map();
        (0, _root_1.autoBind)(this);
    }
    SharedIntersectionObserver.prototype.observerCallback = function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            _this.listeners.trigger(entry.target, entry);
        });
    };
    SharedIntersectionObserver.prototype.observe = function (element, listener, options) {
        var _this = this;
        this.elementsToOptionsMap.set(element, options);
        var observer = this.observers.getOrSet([options], 
        // eslint-disable-next-line @typescript-eslint/unbound-method
        function () { return new IntersectionObserver(_this.observerCallback, options); });
        this.listeners.add(element, listener);
        observer.observe(element);
    };
    SharedIntersectionObserver.prototype.unobserve = function (element, listener) {
        var options = this.elementsToOptionsMap.get(element);
        var observer = this.observers.get([options]);
        if (!observer)
            return;
        this.elementsToOptionsMap.delete(element);
        this.listeners.remove(element, listener);
        observer.unobserve(element);
    };
    SharedIntersectionObserver.prototype.disconnect = function () {
        this.elementsToOptionsMap.clear();
        this.listeners.removeAll();
        this.observers.destroy();
    };
    return SharedIntersectionObserver;
}());
exports.SharedIntersectionObserver = SharedIntersectionObserver;
