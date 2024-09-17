"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMutationObserver = void 0;
var _root_1 = require("@root");
var SharedMutationObserver = /** @class */ (function () {
    function SharedMutationObserver() {
        this.listeners = new _root_1.ListenerStore();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.observer = new MutationObserver(this.processRecords);
        this.elementsToOptionsMap = new Map();
        (0, _root_1.autoBind)(this);
    }
    SharedMutationObserver.prototype.processRecords = function (records) {
        var _this = this;
        records.forEach(function (record) {
            _this.listeners.trigger(record.target, record);
        });
    };
    SharedMutationObserver.prototype.observe = function (element, listener, options) {
        this.elementsToOptionsMap.set(element, options);
        this.listeners.add(element, listener);
        this.observer.observe(element, options);
    };
    SharedMutationObserver.prototype.unobserve = function (element, listener) {
        var _this = this;
        this.listeners.remove(element, listener);
        this.elementsToOptionsMap.delete(element);
        if (this.listeners.getSize() < 1) {
            this.disconnect();
            return;
        }
        this.processRecords(this.observer.takeRecords());
        this.disconnect();
        this.elementsToOptionsMap.forEach(function (options) {
            _this.observe(element, listener, options);
        });
    };
    SharedMutationObserver.prototype.disconnect = function () {
        this.elementsToOptionsMap.clear();
        this.listeners.removeAll();
        this.observer.disconnect();
    };
    return SharedMutationObserver;
}());
exports.SharedMutationObserver = SharedMutationObserver;
