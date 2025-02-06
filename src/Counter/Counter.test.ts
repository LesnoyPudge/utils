import { Counter } from './Counter';



describe('counter', () => {
    it('should provide working methods', () => {
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

    it('should work with initialValue and step', () => {
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

    it('should notify on change', () => {
        const c = new Counter();
        const spy = vi.fn();

        c.onCountChange(spy);

        c.inc(2);

        expect(spy).toBeCalledWith(2);
    });
});