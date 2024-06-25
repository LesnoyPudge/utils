import { ListenerStore, ListenerStoreCallback } from '@root';



type Args = [entry: ResizeObserverEntry];
type Store = ListenerStore<Element, Args>;
type StoreCallback = ListenerStoreCallback<Args>;

export class SharedResizeObserver {
    listeners: Store;
    observer: ResizeObserver;

    constructor() {
        this.listeners = new ListenerStore();
        this.observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                this.listeners.trigger(entry.target, entry);
            });
        });
    }

    observe(
        element: Element,
        listener: StoreCallback,
        options?: ResizeObserverOptions,
    ) {
        this.listeners.add(element, listener);
        this.observer.observe(element, options);
    }

    unobserve(element: Element, listener: StoreCallback) {
        this.listeners.remove(element, listener);
        this.observer.unobserve(element);
    }
}