import { T } from "@lesnoypudge/types-utils-base";
import { Cache } from "@root";



export const memoize = <FN extends T.AnyFunction>(fn: FN) => {
    const cache = new Cache<ReturnType<FN>>();

    return (...args: Parameters<FN>): ReturnType<FN> => {
        return cache.getOrSet(args, () => fn(...args));
    }
}