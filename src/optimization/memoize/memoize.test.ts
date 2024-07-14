import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Counter, memoize, sleep } from '@root';



describe('memoize', () => {
    describe('in case of encountering same args, memoized function should not be called', () => {
        const { get, inc } = new Counter();
        const memoizedFunc = memoize((...args: any[]) => {
            inc();
            return 0;
        });

        const expectedCallCount = 9;

        const argsList = [
            [],
            [],
            [''],
            [undefined],
            [1],
            [1, 2, 3],
            [null],
            [null, () => {}],
            [null],
            [0],
            [1],
            [1, 2],
        ];

        test(`for ${argsList.length} runs, should be called ${expectedCallCount} times`, () => {
            argsList.forEach((args) => {
                memoizedFunc(...args);
            });

            expect(get()).toBe(expectedCallCount);
        });
    });

    describe('results with same arguments should be equal', () => {
        test('base', () => {
            const fn = memoize((num: number) => Math.random() + num);
            expect(fn(5)).toBe(fn(5));
        });

        test('same function as arg', () => {
            const fn = memoize((fn: T.AnyFunction) => fn());
            const fn2 = () => Math.random();

            expect(fn(fn2)).toBe(fn(fn2));
        });

        test('same args', () => {
            const fn = memoize((...args: any[]) => undefined);
            const args: any[] = [
                [],
                {},
                null,
                undefined,
                5,
                'qwe',
                () => {},
            ];

            expect(fn(...args)).toBe(fn(...args));
        });
    });

    describe('results with different arguments should be different', () => {
        test('inline function as arg', () => {
            const fn = memoize((fn: T.AnyFunction) => fn());

            expect(
                fn(() => Math.random()),
            ).not.toBe(
                fn(() => Math.random()),
            );
        });

        test('inline args', () => {
            const fn = memoize((...args: any[]) => Math.random());

            expect(
                fn([[], {}, null, undefined, 5, 'qwe', () => {}]),
            ).not.toBe(
                fn([[], {}, null, undefined, 5, 'qwe', () => {}]),
            );
        });
    });

    describe('clear cache after lifespan ends', () => {
        test('1', async () => {
            const c = new Counter();

            const sum = memoize((a: number, b: number) => {
                c.inc();
                return a + b;
            }, 50);

            sum(1, 2);
            sum(1, 2);

            expect(c.get()).toBe(1);

            await sleep(60);

            sum(1, 2);
            sum(1, 2);

            expect(c.get()).toBe(2);
        });
    });
});