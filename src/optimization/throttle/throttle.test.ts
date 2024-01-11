import { counter, sleep, throttle } from "@root"



describe('throttle', () => {
    describe('should be called once', () => {
        test('1', () => {
            const c = counter();
            const [throttled, {reset}] = throttle(() => c.inc(), 100)

            throttled()
            throttled()
            throttled()

            reset()

            expect(c.get()).toBe(1);
        })

        test('2', () => {
            const c = counter();
            const [throttled, {reset}] = throttle(() => c.inc(), 0)

            throttled()
            throttled()
            throttled()

            reset()

            expect(c.get()).toBe(1);
        })
    })

    describe('should be called multiple times', () => {
        test('1', async() => {
            const c = counter();

            const [throttled, {reset}] = throttle(c.inc, 0);

            throttled()

            await sleep();
            
            throttled()

            await sleep();

            throttled()
            
            reset();

            expect(c.get()).toBe(3);
        })
    })

    describe('should not be called', () => {
        test('1', () => {
            const c = counter();

            const [throttled, {block, reset}] = throttle(c.inc, 0);

            block()

            throttled()
            throttled()
            throttled()

            reset()

            expect(c.get()).toBe(0);
        })
    })

    describe('should work as promise', () => {
        test('1', async() => {
            const c = counter();

            const [throttled, {reset}] = throttle(c.inc, 0);

            await throttled().then(() => {
                c.inc(3)
            })
            
            throttled()

            throttled().then(() => c.inc())
            
            reset();

            expect(c.get()).toBe(5);
        })
    })
})