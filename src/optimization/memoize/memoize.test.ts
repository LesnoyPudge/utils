import { AnyFunction } from "ts-essentials";
import { Counter, memoize} from '@root'



describe('memoize', () => {
    describe('in case of encountering same args, memoized function should not be called', () => {
        const {get, inc} = new Counter();
        const memoizedFunc = memoize((...args: any[]) => {
            inc()
            return 0;
        });

        const expectedCallCount = 9;

        const argsList: any[][] = [
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
            })

            expect(get()).toBe(expectedCallCount)
        });
    })

    describe('results with same arguments should be equal', () => {
        test('base', () => {
            const fn = memoize((num: number) => Math.random() + num)
            expect(fn(5)).toBe(fn(5));
        })

        test('same function as arg', () => {
            const fn = memoize((fn: AnyFunction) => fn())
            const fn2 = () => Math.random()
   
            expect(fn(fn2)).toBe(fn(fn2));
        })
        
        test('same args', () => {
            const fn = memoize((...args: any[]) => undefined)
            const args: any[] = [
                [],
                {},
                null,
                undefined,
                5,
                'qwe',
                () => {},
            ]

            expect(fn(...args)).toBe(fn(...args));
        })
    })

    describe('results with different arguments should be different', () => {
        test('inline function as arg', () => {
            const fn = memoize((fn: AnyFunction) => fn())

            expect(
                fn(() => Math.random())
            ).not.toBe(
                fn(() => Math.random())
            );
        })
        
        test('inline args', () => {
            const fn = memoize((...args: any[]) => Math.random())

            expect(
                fn([[], {}, null, undefined, 5, 'qwe', () => {}])
            ).not.toBe(
                fn([[], {}, null, undefined, 5, 'qwe', () => {}])
            );
        })
    })
})