import { Counter, debounce, sleep } from '@root';



describe('debounce', () => {
    test('1', async () => {
        const c = new Counter();

        const debounced = debounce((val: number) => c.inc(val), 100);

        debounced(5);
        debounced(5);
        debounced(3);

        await sleep(200);

        expect(c.get()).toBe(3);
    });
});