


type Key = any[];

type CacheLayerData<PossibleValues> = {
    isComputed: false;
    value: undefined;
} | {
    isComputed: true;
    value: PossibleValues;
}

class CacheLayer<PossibleValues> {
    data: CacheLayerData<PossibleValues> = {
        isComputed: false,
        value: undefined,
    };
    map: Map<any, CacheLayer<PossibleValues>> | undefined;

    getOrCreateMap() {
        if (!this.map) {
            this.map = new Map()
        }
        
        return this.map;
    }

    setValue<T extends PossibleValues>(value: T): T {
        this.data.isComputed = true;
        this.data.value = value;

        return value;
    }
}

class Cache<PossibleValues> {
    private layer: CacheLayer<PossibleValues> | undefined;

    private getOrCreateLayer(key: Key) {
        if (!this.layer) {
            this.layer = new CacheLayer()
        }

        let currentLayer = this.layer;

        key.forEach((keyPart) => {
            const map = currentLayer.getOrCreateMap()

            if (!map.has(keyPart)) {
                map.set(keyPart, new CacheLayer());
            }

            currentLayer = map.get(keyPart)!;
        })

        return currentLayer;
    }

    private getLayer(key: Key): CacheLayer<PossibleValues> | undefined {
        let currentLayer = this.layer;
    
        if (!this.layer) return undefined;

        const bail = () => {
            currentLayer = undefined;
        }

        key.forEach((keyPart) => {
            if (!currentLayer) return bail();

            const map = currentLayer.map
            if (!map) return bail();

            if (!map.has(keyPart)) return bail();

            currentLayer = map.get(keyPart);
        })

        return currentLayer;
    }

    has(key: Key): boolean {
        return !!this.getLayer(key)?.data.isComputed
    }

    set<T extends PossibleValues>(key: Key, value: T): T {
        return this.getOrCreateLayer(key).setValue(value);
    }

    get(key: Key) {
        return this.getLayer(key)?.data.value;
    }

    getOrSet(key: Key, getNewValueIfEmpty: () => PossibleValues) {
        const layer = this.getOrCreateLayer(key);
        if (layer.data.isComputed) return layer.data.value;

        return layer.setValue(getNewValueIfEmpty())
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

            layer.map.forEach(loop)
        }

        loop(this.layer);

        return size;
    }
}

export const createCache = <PossibleValues>() => new Cache<PossibleValues>();