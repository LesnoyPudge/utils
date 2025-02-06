import { sleep } from './sleep';



describe('sleep', () => {
    it('should pass some time', async () => {
        const startTime = performance.now();

        await sleep();

        expect(performance.now()).toBeGreaterThan(startTime);
    });

    it('should pass at least specified amount of time', async () => {
        const startTime = performance.now();
        const duration = 100;
        const expectedTime = startTime + (duration * 0.9);

        await sleep(duration);

        expect(performance.now()).toBeGreaterThan(expectedTime);
    });
});