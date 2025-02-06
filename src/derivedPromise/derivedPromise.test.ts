import { sleep } from '@root/sleep';
import { derivedPromise } from './derivedPromise';



vi.useFakeTimers();

describe('derivedPromise', () => {
    it('should provide controls to resolve on demand', async () => {
        const [promise, { resolve }] = derivedPromise<number>((res) => {
            void sleep(100).then(() => res(2));
        });

        const spy = vi.fn();

        void promise.then(spy);

        resolve(1);

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledWith(1);

        await vi.advanceTimersByTimeAsync(1_000);

        expect(spy).toBeCalledTimes(1);
    });

    it('should provide controls to reject on demand', async () => {
        const [promise, { reject }] = derivedPromise<number>((res) => {
            void sleep(100).then(() => res(1));
        });

        const successSpy = vi.fn();
        const errorSpy = vi.fn();

        promise.then(successSpy).catch(errorSpy);

        reject();

        await vi.runAllTimersAsync();

        expect(successSpy).toBeCalledTimes(0);
        expect(errorSpy).toBeCalledTimes(1);
    });

    it('should return promise that resolves from excecutor', async () => {
        const [promise] = derivedPromise<number>((res) => {
            res(1);
        });

        const spy = vi.fn();

        void promise.then(spy);

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledWith(1);
    });
});