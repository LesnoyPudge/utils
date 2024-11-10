import { shallowEqual as _shallowEqual } from 'shallow-equal';



export const shallowEqual = (a: unknown, b: unknown): boolean => {
    if (typeof a !== typeof b) return false;

    if (typeof a === 'object' && typeof b === 'object') {
        return _shallowEqual(a, b);
    }

    return a === b;
};