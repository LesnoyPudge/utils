import { Counter } from '@root/Counter';
import { throttle } from './throttle';
import { sleep } from '@root/sleep';



vi.useFakeTimers();

describe('throttle', () => {
    it('should provide controls to cancel pending call', async () => {
        const spy = vi.fn();
        const [throttled, { reset }] = throttle(spy, 100);

        void throttled();
        void throttled();
        void throttled();

        reset();

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledTimes(1);
    });

    it('should be called multiple times', async () => {
        const spy = vi.fn();
        const [throttled] = throttle(spy, 0);

        void throttled();

        await vi.runAllTimersAsync();

        void throttled();

        expect(spy).toBeCalledTimes(2);
    });

    it('should not be called', async () => {
        const spy = vi.fn();
        const [throttled, { block, reset }] = throttle(spy, 0);

        block();

        void throttled();
        void throttled();
        void throttled();

        reset();

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledTimes(0);
    });

    it('should work as promise', async () => {
        const spy = vi.fn();
        const callbackSpy = vi.fn();
        const [throttled] = throttle(spy, 0);

        void throttled().then(callbackSpy);

        await vi.runAllTimersAsync();

        expect(spy).toBeCalledTimes(1);
        expect(callbackSpy).toBeCalledTimes(1);
    });
});