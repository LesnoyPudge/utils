import { sleep } from "@root"



describe('sleep', () => {
    test('1', async() => {
        const startTime = performance.now();

        await sleep();

        expect(performance.now()).toBeGreaterThan(startTime);
    })

    test('2', async() => {
        const startTime = performance.now();
        const duration = 100;
        const expectedTime = startTime + (duration * 0.9);

        await sleep(duration);

        expect(performance.now()).toBeGreaterThan(expectedTime);
    })
})