import { promiseRetry } from './promiseRetry';



vi.useFakeTimers();

describe('promiseRetry', () => {
    it('should try 3 times and fail', async () => {
        const spy = vi.fn();
        const catchSpy = vi.fn();

        void promiseRetry(() => {
            spy();
            return Promise.reject();
        }, 3).catch(catchSpy);

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledTimes(3);
        expect(catchSpy).toBeCalledTimes(1);
    });

    it('should resolve on second attempt', async () => {
        const spy = vi.fn();
        const resolveSpy = vi.fn();
        const RESULT = 1;
        let currentAttempt = 0;

        void promiseRetry(() => {
            spy();

            currentAttempt++;

            // resolve on second attempt
            if (currentAttempt === 2) {
                return Promise.resolve(RESULT);
            }

            return Promise.reject();
        }, 3).then(resolveSpy);

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledTimes(2);
        expect(resolveSpy).toBeCalledTimes(1);
        expect(resolveSpy).toBeCalledWith(RESULT);
    });
});