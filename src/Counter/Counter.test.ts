import { Counter } from './Counter';



describe('counter', () => {
    test('1', () => {
        const {
            increase,
            get,
            decrease,
            reset,
            setCount,
            setInitialCount,
            setStep,
        } = new Counter();

        increase(2);
        increase();

        expect(get()).toBe(3);

        increase(5);

        expect(get()).toBe(8);

        increase();

        expect(get()).toBe(9);

        setStep(2);

        increase();

        expect(get()).toBe(11);

        decrease();

        expect(get()).toBe(9);

        decrease(1);

        expect(get()).toBe(8);

        setStep(1);

        reset();

        expect(get()).toBe(0);

        setInitialCount(11);

        reset();

        expect(get()).toBe(11);

        setCount(5);

        expect(get()).toBe(5);
    });

    test('2', () => {
        const {
            get,
            inc,
            reset,
            setInitialCount,
        } = new Counter(5, 3);

        expect(get()).toBe(5);

        inc();

        expect(get()).toBe(8);

        setInitialCount(0);
        reset();

        expect(get()).toBe(0);
    });

    test('3', () => {
        const c = new Counter();
        let result = 0;

        c.onCountChange((value) => {
            result = value;
        });

        c.inc(2);

        expect(result).toBe(2);
    });
});