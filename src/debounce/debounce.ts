import { T } from '@lesnoypudge/types-utils-base/namespace';



/**
 * Wraps provided function and delays execution until
 * provided delay is passed from last call.
 */
export const debounce = <Args extends unknown[]>(
    fn: T.AnyFunction<Args>,
    delay: number,
) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};