


/**
 * Wraps a promise with a timeout, rejecting if it
 * does not resolve within the specified time.
 */
export const promiseTimeout = <_Value>(
    fn: Promise<_Value>,
    timeout: number,
): Promise<_Value> => {
    let id: ReturnType<typeof setTimeout>;

    return new Promise<_Value>((resolve, reject) => {
        id = setTimeout(() => {
            reject('TIMEOUT');
        }, timeout);

        void fn.then((value) => {
            clearTimeout(id);
            resolve(value);
        }).catch((error) => {
            clearTimeout(id);
            reject(error);
        });
    });
};