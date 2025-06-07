import { catchErrorAsync } from '@root/catchErrorAsync';
import { sleep } from '@root/sleep';



// exponential backoff
const defaultBackoff = (attempt: number) => {
    return 100 * Math.min(200, Math.max(0, attempt - 1) ** 3);
};

/**
 * Retries a function until it succeeds or the attempt
 * limit is reached.
 */
export const promiseRetry = async <_Value>(
    fn: () => Promise<_Value>,
    maxAttempts: number,
    backoffFn = defaultBackoff,
): Promise<_Value> => {
    let currentAttempt = 0;

    while (true) {
        currentAttempt++;

        const [value, error] = await catchErrorAsync(fn);

        if (!error) return value;

        if (currentAttempt >= maxAttempts) {
            throw error;
        }

        const delay = backoffFn(currentAttempt);
        if (delay > 0) {
            await sleep(delay);
        }
    }
};