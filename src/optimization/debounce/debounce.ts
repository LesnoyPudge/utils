import { AnyFunction } from "ts-essentials";



export const debounce = <Args extends unknown[]>(
    fn: AnyFunction<Args>,
    delay: number,
) => {
    let timeout: ReturnType<typeof setTimeout>;
    
    return (...args: Args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }
}