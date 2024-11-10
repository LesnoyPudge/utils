import { autoBind } from '@root';

type KeyToKeyMap = {};

class Cache2<_Value> {
    private store: WeakMap<unknown[], _Value> | Map<unknown[], _Value>;
    // private keyToKeyMap: (
    //     WeakMap<unknown[], unknown[]>
    //     | Map<unknown[], unknown[]>
    // );
    private isWeak: boolean;
    private maxSize: number | null;
    private _size: number;
    private ttl: number | null;

    constructor(
        maxSize: number | null = null,
        ttl: number | null = null,
    ) {
        this.isWeak = maxSize === null;
        this._size = 0;
        this.maxSize = maxSize;
        this.ttl = this.isWeak ? null : ttl;
        this.store = this.isWeak ? new WeakMap() : new Map();

        autoBind(this);
    }

    public get size() {
        return this._size;
    }

    add(key: unknown[], value: _Value) {
        if (!this.isWeak && !this.store.has(key)) {
            this._size += 1;
        }

        this.store.set(key, value);
    }

    delete(key: unknown[]) {
        if (!this.isWeak && !this.store.has(key)) {
            this._size -= 1;
        }

        this.store.delete(key);
    }

    clear() {
        if (!(this.store instanceof Map)) return;

        this.store.clear();
    }

    get(key: unknown[], newValueFactory?: () => _Value) {
        const isExist = this.store.has(key);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (isExist) return this.store.get(key)!;

        if (!this.isWeak) {
            this._size += 1;
        }

        if (newValueFactory) {
            const newValue = newValueFactory();
            this.store.set(key, newValue);
            return newValue;
        }

        return;
    }
}

const qwe = new Cache2();

qwe.size;