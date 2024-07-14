import { T } from '@lesnoypudge/types-utils-base/namespace';



export const isObject = (v: unknown): v is T.UnknownRecord => {
    return typeof v === 'object' && v !== null;
};