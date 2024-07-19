import { T } from '@lesnoypudge/types-utils-base/namespace';



export type ListenerStoreCallback<Args extends unknown[]> = (
    T.AnyFunction<Args, void>
);

export class ListenerStore<
    Key,
    Args extends unknown[],
> {
    private store: Map<Key, Set<ListenerStoreCallback<Args>>>;

    constructor() {
        this.store = new Map();
    }

    add(key: Key, listener: ListenerStoreCallback<Args>) {
        let listeners = this.store.get(key);
        if (!listeners) {
            listeners = new Set();
            this.store.set(key, listeners);
        }

        listeners.add(listener);

        return () => this.remove(key, listener);
    }

    remove(key: Key, listener: ListenerStoreCallback<Args>) {
        const listeners = this.store.get(key);
        if (!listeners) return;

        listeners.delete(listener);

        if (listeners.size === 0) {
            this.store.delete(key);
        }
    }

    removeAll() {
        this.store.clear();
    }

    trigger(key: Key, ...args: Args) {
        const listeners = this.store.get(key);
        if (!listeners) return;

        listeners.forEach((listener) => {
            listener(...args);
        });
    }

    triggerAll(...args: Args) {
        this.store.forEach((value) => {
            value.forEach((listener) => {
                listener(...args);
            });
        });
    }

    getSize() {
        let size = 0;

        this.store.forEach((value) => {
            size += value.size;
        });

        return size;
    }
}