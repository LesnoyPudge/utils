import { T } from '@lesnoypudge/types-utils-base/namespace';



export const toPromise = <_Fn extends T.AnyFunction>(
    fn: _Fn,
): (...args: Parameters<_Fn>) => Promise<Awaited<ReturnType<_Fn>>> => {
    return (...args: Parameters<_Fn>) => {
        return new Promise((resolve, reject) => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const possiblePromise = fn(...args);

                if (possiblePromise instanceof Promise) {
                    // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
                    possiblePromise.then(resolve).catch(reject);
                    return;
                }

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                resolve(possiblePromise);
            } catch (error) {
                reject(error);
            }
        });
    };
};