import { promiseTimeout } from './promiseTimeout';



vi.useFakeTimers();

const PROMISE_RESULT = 1;

const SMALL_MS = 500;
const MEDIUM_MS = 1_000;
const BIG_MS = 1_500;

const sleep = () => new Promise<typeof PROMISE_RESULT>((res, rej) => {
    setTimeout(() => {
        res(PROMISE_RESULT);
    }, MEDIUM_MS);
});

describe('promiseTimeout', () => {
    it('should throw due to time limit', async () => {
        const catchSpy = vi.fn();

        void promiseTimeout(sleep(), SMALL_MS).catch(catchSpy);

        await vi.advanceTimersByTimeAsync(MEDIUM_MS);

        expect(catchSpy).toBeCalledTimes(1);
    });

    it('should resolve', async () => {
        const resolveSpy = vi.fn();

        void promiseTimeout(sleep(), BIG_MS).then(resolveSpy);

        await vi.advanceTimersByTimeAsync(MEDIUM_MS);

        expect(resolveSpy).toBeCalledTimes(1);
        expect(resolveSpy).toBeCalledWith(PROMISE_RESULT);
    });
});