import { T } from '@lesnoypudge/types-utils-base/namespace';
import { autoBind } from '@root/libs';



export namespace ListenerStore {
    export type Callback<Args extends unknown[]> = (
        T.AnyFunction<Args, void>
    );
}

/**
 * Store for callbacks.
 * Provides ability to execute callbacks on demand.
 */
export class ListenerStore<
    Key,
    Args extends unknown[],
> {
    private store: Map<Key, Set<ListenerStore.Callback<Args>>>;

    constructor() {
        this.store = new Map();

        autoBind(this);
    }

    add(key: Key, listener: ListenerStore.Callback<Args>) {
        let listeners = this.store.get(key);
        if (!listeners) {
            listeners = new Set();
            this.store.set(key, listeners);
        }

        listeners.add(listener);

        return () => this.remove(key, listener);
    }

    remove(key: Key, listener: ListenerStore.Callback<Args>) {
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