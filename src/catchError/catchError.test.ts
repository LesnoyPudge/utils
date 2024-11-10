import { catchError } from '@root';



describe('catchError', () => {
    test('1', () => {
        const case1 = catchError(() => {
            throw new Error('');
        });

        const case2 = catchError(() => {
            return 2;
        });

        const message = 'unusual error';
        const case3 = catchError(() => {
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