"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
var CacheLayer = /** @class */ (function () {
    function CacheLayer() {
        this.data = {
            isComputed: false,
            value: undefined,
            cleanupTimeoutId: null,
        };
    }
    CacheLayer.prototype.getOrCreateMap = function () {
        if (!this.map) {
            this.map = new Map();
        }
        return this.map;
    };
    CacheLayer.prototype.setValue = function (value, lifespan) {
        var _this = this;
        if (this.data.cleanupTimeoutId !== null) {
            clearTimeout(this.data.cleanupTimeoutId);
        }
        this.data.isComputed = true;
        this.data.value = value;
        if (lifespan !== Infinity) {
            this.data.cleanupTimeoutId = setTimeout(function () {
                _this.data.isComputed = false;
                _this.data.value = undefined;
                _this.data.cleanupTimeoutId = null;
            }, lifespan);
        }
        return value;
    };
    return CacheLayer;
}());
var Cache = /** @class */ (function () {
    function Cache() {
    }
    Cache.prototype.getOrCreateLayer = function (key) {
        if (!this.layer) {
            this.layer = new CacheLayer();
        }
        var currentLayer = this.layer;
        key.forEach(function (keyPart) {
            var map = currentLayer.getOrCreateMap();
            var layer = map.get(keyPart);
            if (!layer) {
                currentLayer = new CacheLayer();
                map.set(keyPart, currentLayer);
                return;
            }
            currentLayer = layer;
        });
        return currentLayer;
    };
    Cache.prototype.getLayer = function (key) {
        var currentLayer = this.layer;
        if (!this.layer)
            return undefined;
        var bail = function () {
            currentLayer = undefined;
        };
        key.forEach(function (keyPart) {
            if (!currentLayer)
                return bail();
            var map = currentLayer.map;
            if (!map)
                return bail();
            if (!map.has(keyPart))
                return bail();
            currentLayer = map.get(keyPart);
        });
        return currentLayer;
    };
    Cache.prototype.has = function (key) {
        var _a;
        return !!((_a = this.getLayer(key)) === null || _a === void 0 ? void 0 : _a.data.isComputed);
    };
    Cache.prototype.set = function (key, value, lifespan) {
        if (lifespan === void 0) { lifespan = Infinity; }
        return this.getOrCreateLayer(key).setValue(value, lifespan);
    };
    Cache.prototype.get = function (key) {
        var _a;
        return (_a = this.getLayer(key)) === null || _a === void 0 ? void 0 : _a.data.value;
    };
    Cache.prototype.getOrSet = function (key, getNewValueIfEmpty, lifespan) {
        if (lifespan === void 0) { lifespan = Infinity; }
        var layer = this.getOrCreateLayer(key);
        if (layer.data.isComputed)
            return layer.data.value;
        return layer.setValue(getNewValueIfEmpty(), lifespan);
    };
    Cache.prototype.getSize = function () {
        var _a;
        var size = 0;
        if ((_a = this.layer) === null || _a === void 0 ? void 0 : _a.data.isComputed) {
            size++;
        }
        var loop = function (layer) {
            if (!layer)
                return;
            if (!layer.map)
                return;
            size += layer.map.size;
            layer.map.forEach(loop);
        };
        loop(this.layer);
        return size;
    };
    Cache.prototype.destroy = function () {
        this.layer = undefined;
    };
    return Cache;
}());
exports.Cache = Cache;
