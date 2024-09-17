"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineWorker = void 0;
var _root_1 = require("@root");
var InlineWorker = /** @class */ (function () {
    function InlineWorker(fn, onSuccess, onError) {
        if (onSuccess === void 0) { onSuccess = _root_1.noop; }
        if (onError === void 0) { onError = _root_1.noop; }
        this.worker = null;
        this.queue = [];
        this.fn = fn;
        this.onSuccess = onSuccess;
        this.onError = onError;
        (0, _root_1.autoBind)(this);
    }
    InlineWorker.prototype.createWorker = function (fn) {
        var _this = this;
        var workerCode = ("\n            const workerFunction = (".concat(fn.toString(), ");\n        \n            onmessage = (event) => {\n                const args = event.data;\n                const result = workerFunction(...args);\n                postMessage(result);\n            };\n        "));
        var workerBlob = new Blob([workerCode], {
            type: 'application/javascript',
        });
        var worker = new Worker(URL.createObjectURL(workerBlob));
        worker.onerror = function (event) {
            var _a;
            (_a = _this.queue[0]) === null || _a === void 0 ? void 0 : _a.reject(event);
            _this.onError(event);
        };
        worker.onmessage = function (event) {
            var _a;
            (_a = _this.queue[0]) === null || _a === void 0 ? void 0 : _a.resolve(event.data);
            _this.onSuccess(event.data);
        };
        return worker;
    };
    InlineWorker.prototype.start = function () {
        var _this = this;
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.worker) {
            this.worker = this.createWorker(this.fn);
        }
        var _b = (0, _root_1.derivedPromise)(), promise = _b[0], controls = _b[1];
        void promise.finally(function () {
            var _a, _b;
            _this.queue.shift();
            if (_this.queue.length) {
                (_a = _this.worker) === null || _a === void 0 ? void 0 : _a.postMessage((_b = _this.queue[0]) === null || _b === void 0 ? void 0 : _b.args);
            }
        });
        this.queue.push(__assign({ promise: promise, args: args }, controls));
        if (this.queue.length <= 1) {
            this.worker.postMessage((_a = this.queue[0]) === null || _a === void 0 ? void 0 : _a.args);
        }
        return promise;
    };
    InlineWorker.prototype.cancel = function () {
        var _a;
        (_a = this.queue[0]) === null || _a === void 0 ? void 0 : _a.reject();
    };
    InlineWorker.prototype.terminate = function () {
        var _a;
        (_a = this.worker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.worker = null;
        var items = __spreadArray([], this.queue, true);
        this.queue = [];
        items.forEach(function (item) { return item.reject(); });
    };
    return InlineWorker;
}());
exports.InlineWorker = InlineWorker;
