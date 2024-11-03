import { T } from "@lesnoypudge/types-utils-base/namespace";



export const toPromise = <_Fn extends T.AnyFunction>(
    fn: _Fn,
): (...args: Parameters<_Fn>) => Promise<Awaited<ReturnType<_Fn>>> => {
    return (...args: Parameters<_Fn>) => {
        return new Promise((resolve, reject) => {
            try {
                const possiblePromise = fn(...args);
    
                if (possiblePromise instanceof Promise) {
                    possiblePromise.then(resolve).catch(reject);
                    return;
                }
    
                resolve(possiblePromise);
            } catch (error) {
                reject(error);
            }
        });
    }
};