import { autoBind } from '@root/libs/libs';



type Key = unknown[];

type CacheLayerData<PossibleValues> = ({
    isComputed: false;
    value: undefined;
} | {
    isComputed: true;
    value: PossibleValues;
}) & {
    cleanupTimeoutId: null | ReturnType<typeof setTimeout>;
};

class CacheLayer<PossibleValues> {
    data: CacheLayerData<PossibleValues> = {
        isComputed: false,
        value: undefined,
        cleanupTimeoutId: null,
    };

    map?: Map<unknown, CacheLayer<PossibleValues>>;

    getOrCreateMap() {
        if (!this.map) {
            this.map = new Map();
        }

        return this.map;
    }

    setValue<T extends PossibleValues>(value: T, lifespan: number): T {
        if (this.data.cleanupTimeoutId !== null) {
            clearTimeout(this.data.cleanupTimeoutId);
        }

        this.data.isComputed = true;
        this.data.value = value;

        if (lifespan !== Infinity) {
            this.data.cleanupTimeoutId = setTimeout(() => {
                this.data.isComputed = false;
                this.data.value = undefined;
                this.data.cleanupTimeoutId = null;
            }, lifespan);
        }

        return value;
    }
}

/**
 * Storage that uses references as keys.
 */
export class Cache<PossibleValues> {
    private layer: CacheLayer<PossibleValues> | undefined;

    constructor() {
        autoBind(this);
    }

    private getOrCreateLayer(key: Key) {
        if (!this.layer) {
            this.layer = new CacheLayer();
        }

        let currentLayer = this.layer;

        key.forEach((keyPart) => {
            const map = currentLayer.getOrCreateMap();
            const layer = map.get(keyPart);

            if (!layer) {
                currentLayer = new CacheLayer();
                map.set(keyPart, currentLayer);
                return;
            }

            currentLayer = layer;
        });

        return currentLayer;
    }

    private getLayer(key: Key): CacheLayer<PossibleValues> | undefined {
        let currentLayer = this.layer;

        if (!this.layer) return undefined;

        const bail = () => {
            currentLayer = undefined;
        };

        key.forEach((keyPart) => {
            if (!currentLayer) return bail();

            const map = currentLayer.map;
            if (!map) return bail();

            if (!map.has(keyPart)) return bail();

            currentLayer = map.get(keyPart);
        });

        return currentLayer;
    }

    has(key: Key): boolean {
        return !!this.getLayer(key)?.data.isComputed;
    }

    set<Value extends PossibleValues>(
        key: Key,
        value: Value,
        lifespan = Infinity,
    ): Value {
        return this.getOrCreateLayer(key).setValue(value, lifespan);
    }

    get(key: Key) {
        return this.getLayer(key)?.data.value;
    }

    getOrSet(
        key: Key,
        getNewValueIfEmpty: () => PossibleValues,
        lifespan = Infinity,
    ) {
        const layer = this.getOrCreateLayer(key);
        if (layer.data.isComputed) return layer.data.value;

        return layer.setValue(getNewValueIfEmpty(), lifespan);
    }

    getSize() {
        let size = 0;

        if (this.layer?.data.isComputed) {
            size++;
        }

        const loop = (layer: typeof this.layer) => {
            if (!layer) return;
            if (!layer.map) return;

            size += layer.map.size;

            layer.map.forEach(loop);
        };

        loop(this.layer);

        return size;
    }

    destroy() {
        this.layer = undefined;
    }
}