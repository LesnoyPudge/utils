import { T } from "@lesnoypudge/types-utils-base";



export const debounce = <Args extends unknown[]>(
    fn: T.AnyFunction<Args>,
    delay: number,
) => {
    let timeout: ReturnType<typeof setTimeout>;
    
    return (...args: Args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }
}