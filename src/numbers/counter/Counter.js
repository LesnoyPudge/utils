"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
var _root_1 = require("@root");
var Counter = /** @class */ (function () {
    function Counter(initialCount, initialStep) {
        if (initialCount === void 0) { initialCount = 0; }
        if (initialStep === void 0) { initialStep = 1; }
        this.set = this.setCount.bind(this);
        this.get = this.getCount.bind(this);
        this.inc = this.increase.bind(this);
        this.dec = this.decrease.bind(this);
        this.count = initialCount;
        this.initialCount = initialCount;
        this.step = initialStep;
        this.initialStep = initialStep;
        (0, _root_1.autoBind)(this);
    }
    Counter.prototype.setCount = function (value) {
        var _a;
        this.count = value;
        (_a = this.listenerStore) === null || _a === void 0 ? void 0 : _a.trigger(null, value);
    };
    Counter.prototype.getCount = function () {
        return this.count;
    };
    Counter.prototype.setInitialCount = function (value) {
        this.initialCount = value;
    };
    Counter.prototype.getInitialCount = function () {
        return this.initialCount;
    };
    Counter.prototype.setStep = function (value) {
        this.step = value;
    };
    Counter.prototype.getStep = function () {
        return this.step;
    };
    Counter.prototype.setInitialStep = function (value) {
        this.initialStep = value;
    };
    Counter.prototype.getInitialStep = function () {
        return this.initialStep;
    };
    Counter.prototype.increase = function (value) {
        this.setCount(this.count + (value !== null && value !== void 0 ? value : this.step));
    };
    Counter.prototype.decrease = function (value) {
        this.setCount(this.count - (value !== null && value !== void 0 ? value : this.step));
    };
    Counter.prototype.resetCount = function () {
        this.setCount(this.initialCount);
    };
    Counter.prototype.resetStep = function () {
        this.step = this.initialStep;
    };
    Counter.prototype.reset = function () {
        this.resetCount();
        this.resetStep();
    };
    Counter.prototype.onCountChange = function (cb) {
        if (!this.listenerStore) {
            this.listenerStore = new _root_1.ListenerStore();
        }
        var store = this.listenerStore;
        store.add(null, cb);
        return function () { return store.remove(null, cb); };
    };
    return Counter;
}());
exports.Counter = Counter;
