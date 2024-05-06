import { AnyFunction } from "ts-essentials";



export type ListenerStoreCallback<Args extends unknown[]> = (
    AnyFunction<Args, void>
);

export class ListenerStore<
    Key, 
    Args extends unknown[],
> {
    private store: Map<Key, Set<ListenerStoreCallback<Args>>>;

    constructor() {
        this.store = new Map()
    }

    add(key: Key, listener: ListenerStoreCallback<Args>) {
        let listeners = this.store.get(key)
        if (!listeners) {
            listeners = new Set();
            this.store.set(key, listeners);
        }

        listeners.add(listener);
    }

    remove(key: Key, listener: ListenerStoreCallback<Args>) {
        let listeners = this.store.get(key)
        if (!listeners) return;

        listeners.delete(listener);

        if (listeners.size === 0) {
            this.store.delete(key)
        }
    }

    trigger(key: Key, ...args: Args) {
        const listeners = this.store.get(key);
        if (!listeners) return;

        listeners.forEach((listener) => {
            listener(...args)
        })
    }
}