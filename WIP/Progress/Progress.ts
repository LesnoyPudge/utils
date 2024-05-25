import { AnyFunction } from "ts-essentials";
import { ListenerStore, autoBind, clamp } from "../../src";



class ObservableValue<Value> {
    private _value: Value;
    private _listenerStore: ListenerStore<null, [Value]>;

    constructor(initialValue: Value) {
        this._value = initialValue;
        this._listenerStore = new ListenerStore();
        autoBind(this)
    }
    
    get() {
        return this._value;
    }
    
    set(newValue: Value) {
        this._value = newValue;
        this._listenerStore.trigger(null, this._value);
    }

    subscribe(cb: AnyFunction<[Value]>) {
        this._listenerStore.add(null, cb);

        return () => this.unsubscribe(cb);
    }

    unsubscribe(cb: AnyFunction<[Value]>) {
        this._listenerStore.remove(null, cb);
    }
}

export class Progress {
    _observable: ObservableValue<number>;

    constructor(initialValue = 0) {
        this._observable = new ObservableValue(initialValue);
    }

    set(newValue: number) {
        // this.set(clamp(0, newValue, 1))
    }

    reset() {
        this.set(0);
    }

    end() {
        this.set(1);
    }
}

// export class Progress {
//     private _value: number;
//     private _listenerStore: ListenerStore<null, [number]>;

//     constructor(initialValue = 0) {
//         this._value = initialValue;
//         this._listenerStore = new ListenerStore();
//     }

//     get() {
//         return this._value;
//     }
    
//     set(newValue: number) {
//         this._value = clamp(0, newValue, 1);
//         this._listenerStore.trigger(null, this._value);
//     }

//     reset() {
//         this.set(0);
//     }

//     end() {
//         this.set(1);
//     }

//     subscribe(cb: ListenerCallback) {
//         this._listenerStore.add(null, cb);

//         return () => this.unsubscribe(cb);
//     }

//     unsubscribe(cb: ListenerCallback) {
//         this._listenerStore.remove(null, cb);
//     }    
// }