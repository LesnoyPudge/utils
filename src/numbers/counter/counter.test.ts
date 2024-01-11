import { counter } from "@root"



describe('counter', () => {
    test('1', () => {
        const {
            increase, 
            get,
            decrease,
            reset,
            setCount,
            setInitial,
            setStep,
        } = counter();

        increase(2)
        increase()

        expect(get()).toBe(3)
        
        increase(5);

        expect(get()).toBe(8)
    
        increase()

        expect(get()).toBe(9)

        setStep(2)

        increase()

        expect(get()).toBe(11)

        decrease()

        expect(get()).toBe(9)

        decrease(1)

        expect(get()).toBe(8)

        setStep(1)

        reset()

        expect(get()).toBe(0)

        setInitial(11)

        reset()

        expect(get()).toBe(11)

        setCount(5)

        expect(get()).toBe(5)
    })

    test('2', () => {
        const {
            get, 
            inc, 
            reset,
            setInitial,
        } = counter(5, 3);

        expect(get()).toBe(5)

        inc()

        expect(get()).toBe(8)

        setInitial(0)
        reset()

        expect(get()).toBe(0)
    })
})