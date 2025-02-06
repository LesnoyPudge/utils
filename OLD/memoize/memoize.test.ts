// /* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable unicorn/consistent-function-scoping */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// import { T } from '@lesnoypudge/types-utils-base/namespace';
// import { memoize } from './memoize';



// vi.useFakeTimers();

// describe('memoize', () => {
//     it(`should not recalculate when same props is encountered`, () => {
//         const spy = vi.fn();
//         const memoizedFunc = memoize((..._: any[]) => {
//             spy();
//             return 0;
//         });

//         const expectedCallCount = 9;

//         const argsList = [
//             [],
//             [],
//             [''],
//             [undefined],
//             [1],
//             [1, 2, 3],
//             [null],
//             [null, () => {}],
//             [null],
//             [0],
//             [1],
//             [1, 2],
//         ];

//         argsList.forEach((args) => {
//             memoizedFunc(...args);
//         });

//         expect(spy).toBeCalledTimes(expectedCallCount);
//     });

//     describe('results with same arguments should be equal', () => {
//         it('with base', () => {
//             const fn = memoize((num: number) => Math.random() + num);
//             expect(fn(5)).toBe(fn(5));
//         });

//         it('with same function as arg', () => {
//             const fn = memoize((fn: T.AnyFunction) => fn());
//             const fn2 = () => Math.random();

//             expect(fn(fn2)).toBe(fn(fn2));
//         });

//         it('with same args', () => {
//             const fn = memoize((..._: any[]) => undefined);
//             const args = [
//                 [],
//                 {},
//                 null,
//                 undefined,
//                 5,
//                 'qwe',
//                 () => {},
//             ];

//             expect(fn(...args)).toBe(fn(...args));
//         });
//     });

//     describe('results with different arguments should be different', () => {
//         it('with inline function as arg', () => {
//             const fn = memoize((fn: T.AnyFunction) => fn());

//             expect(
//                 fn(() => Math.random()),
//             ).not.toBe(
//                 fn(() => Math.random()),
//             );
//         });

//         it('with inline args', () => {
//             const fn = memoize((..._: any[]) => Math.random());

//             expect(
//                 fn([[], {}, null, undefined, 5, 'qwe', () => {}]),
//             ).not.toBe(
//                 fn([[], {}, null, undefined, 5, 'qwe', () => {}]),
//             );
//         });
//     });

//     it('should clear cache after lifespan ends', async () => {
//         const spy = vi.fn();
//         const DELAY = 100;
//         const sum = memoize((a: number, b: number) => {
//             spy();
//             return a + b;
//         }, DELAY);

//         sum(1, 2);
//         sum(1, 2);

//         expect(spy).toBeCalledTimes(1);

//         await vi.advanceTimersByTimeAsync(DELAY);

//         sum(1, 2);
//         sum(1, 2);

//         expect(spy).toBeCalledTimes(2);
//     });
// });