import { ListenerStore, ListenerStoreCallback } from '@root';



type Args = [entry: IntersectionObserverEntry];
type Store = ListenerStore<Element, Args>;
type StoreCallback = ListenerStoreCallback<Args>;

export class SharedIntersectionObserver {
    listeners: Store;
    observer: IntersectionObserver;

    constructor(options?: IntersectionObserverInit) {
        this.listeners = new ListenerStore();
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                this.listeners.trigger(entry.target, entry);
            });
        }, options);
    }

    observe(element: Element, listener: StoreCallback) {
        this.listeners.add(element, listener);
        this.observer.observe(element);
    }

    unobserve(element: Element, listener: StoreCallback) {
        this.listeners.remove(element, listener);
        this.observer.unobserve(element);
    }
}