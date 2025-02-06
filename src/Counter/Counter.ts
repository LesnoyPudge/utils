import { ListenerStore } from '@root/ListenerStore';
import { autoBind } from '@root/libs';



type Args = [value: number];
type Store = ListenerStore<null, Args>;
type StoreCallback = ListenerStore.Callback<Args>;

/**
 * Provides counter with abilities to manipulate and listen for value change.
 */
export class Counter {
    private count: number;
    private initialCount: number;
    private step: number;
    private initialStep: number;
    private listenerStore?: Store;

    constructor(initialCount = 0, initialStep = 1) {
        this.count = initialCount;
        this.initialCount = initialCount;
        this.step = initialStep;
        this.initialStep = initialStep;

        autoBind(this);
    }

    setCount(value: number) {
        this.count = value;
        this.listenerStore?.trigger(null, value);
    }

    set = this.setCount.bind(this);

    getCount() {
        return this.count;
    }

    get = this.getCount.bind(this);

    setInitialCount(value: number) {
        this.initialCount = value;
    }

    getInitialCount() {
        return this.initialCount;
    }

    setStep(value: number) {
        this.step = value;
    }

    getStep() {
        return this.step;
    }

    setInitialStep(value: number) {
        this.initialStep = value;
    }

    getInitialStep() {
        return this.initialStep;
    }

    increase(value?: number) {
        this.setCount(this.count + (value ?? this.step));
    }

    inc = this.increase.bind(this);

    decrease(value?: number) {
        this.setCount(this.count - (value ?? this.step));
    }

    dec = this.decrease.bind(this);

    resetCount() {
        this.setCount(this.initialCount);
    }

    resetStep() {
        this.step = this.initialStep;
    }

    reset() {
        this.resetCount();
        this.resetStep();
    }

    onCountChange(cb: StoreCallback) {
        if (!this.listenerStore) {
            this.listenerStore = new ListenerStore();
        }

        const store = this.listenerStore;
        store.add(null, cb);

        return () => store.remove(null, cb);
    }
}