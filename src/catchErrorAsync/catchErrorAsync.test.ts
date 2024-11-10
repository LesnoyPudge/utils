import { catchErrorAsync } from '@root';



describe('catchErrorAsync', () => {
    test('1', async () => {
        const case1 = await catchErrorAsync(() => {
            throw new Error('');
        });

        const case2 = await catchErrorAsync(() => {
            return Promise.resolve(2);
        });

        const message = 'unusual error';
        const case3 = await catchErrorAsync(() => {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw message;
        });

        expect(case1[0]).toBe(undefined);
        expect(case1[1]).toBeInstanceOf(Error);
        expect(case2[0]).toBe(2);
        expect(case2[1]).toBe(undefined);
        expect(case3[1]).toBeInstanceOf(Error);
        expect(case3[1]?.message).toBe(message);
    });
});