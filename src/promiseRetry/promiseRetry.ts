import { catchErrorAsync } from '@root/catchErrorAsync';



/**
 * Retries a function until it succeeds or the attempt
 * limit is reached.
 */
export const promiseRetry = async <_Value>(
    fn: () => Promise<_Value>,
    maxAttempts: number,
): Promise<_Value> => {
    let currentAttempt = 0;

    while (true) {
        currentAttempt++;

        const [value, error] = await catchErrorAsync(fn);

        if (!error) return value;

        if (currentAttempt >= maxAttempts) {
            throw error;
        }
    }
};