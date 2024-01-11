import { AnyFunction } from "ts-essentials";
import { createCache } from "@root";



export const memoize = <FN extends AnyFunction>(fn: FN) => {
    const cache = createCache<ReturnType<FN>>();

    return (...args: Parameters<FN>): ReturnType<FN> => {
        return cache.getOrSet(args, () => fn(...args));
    }
}