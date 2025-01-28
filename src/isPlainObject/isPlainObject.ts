import { T } from '@lesnoypudge/types-utils-base/namespace';



// https://github.com/jonschlinkert/is-plain-object

const isObject = (value: unknown): value is object => {
    return Object.prototype.toString.call(value) === '[object Object]';
};

export const isPlainObject = (value: unknown): value is T.UnknownRecord => {
    // let ctor, prot;

    if (!isObject(value)) return false;

    // If has modified constructor
    const ctor = value.constructor;

    if (ctor === undefined) return true;

    // If has modified prototype
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const prot = ctor.prototype;
    if (!isObject(prot)) return false;

    // If constructor does not have an Object-specific method
    // eslint-disable-next-line no-prototype-builtins
    if (!prot.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    // Most likely a plain Object
    return true;
};