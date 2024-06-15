import { T } from '@lesnoypudge/types-utils-base';
import {
    ListenerStore,
    addEventListener,
    parseJSON,
    shallowEqual,
} from '@root';



export class LocalStorage<
    _Storage extends Record<string, unknown>,
    _SelectedValue,
    _Selector extends (value: _Storage) => _SelectedValue,
> {
    private _storage: Storage & _Storage;
    private _listeners: ListenerStore<null, [_Storage]>;
    private _cleanup: T.AnyFunction;

    constructor() {
        this._storage = window.localStorage as unknown as Storage & _Storage;
        this._listeners = new ListenerStore();
        this._cleanup = addEventListener(window, 'storage', () => {
            this._listeners.trigger(null, this._storage);
        });
    }

    destroy() {
        this._cleanup();
    }

    subscribe(
        selector: _Selector,
        cb: (value: _SelectedValue) => void,
    ) {
        let prevSelected: _SelectedValue;

        return this._listeners.add(null, (value) => {
            const selected = selector(value);

            if (shallowEqual(prevSelected, selected)) return;

            prevSelected = selected;

            cb(selected);
        });
    }

    set<_Key extends Extract<keyof _Storage, string>>(
        key: _Key,
        newValue: _Storage[_Key],
    ) {
        this._storage.setItem(key, JSON.stringify(newValue));
    }

    get<_Key extends Extract<keyof _Storage, string>>(
        key: _Key,
        defaultValue: _Storage[_Key],
    ) {
        const item = this._storage.getItem(key);
        if (item === null && defaultValue !== null) {
            this._storage.setItem(key, JSON.stringify(defaultValue));
        }

        const item2 = this._storage.getItem(key);
        if (item2 === null) return item2;

        return parseJSON<_Storage[_Key]>(item2) ?? defaultValue;
    }
}

// export const storage = () => {
//     return {
//         subscribe,
//         unsubscribe,
//         get,
//         set,
//     };
// };