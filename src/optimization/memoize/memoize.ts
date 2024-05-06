import { AnyFunction } from "ts-essentials";
import { Cache } from "@root";



export const memoize = <FN extends AnyFunction>(fn: FN) => {
    const cache = new Cache<ReturnType<FN>>();

    return (...args: Parameters<FN>): ReturnType<FN> => {
        return cache.getOrSet(args, () => fn(...args));
    }
}