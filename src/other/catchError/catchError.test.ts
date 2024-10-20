import { catchError } from '@root';



describe('catchError', () => {
    test('1', () => {
        expect(catchError(() => {
            throw new Error('');
        }, 1)).toBe(1);

        expect(catchError(() => {
            throw new Error('');
        })).toBe(undefined);

        expect(catchError(() => {
            return 2;
        }, 1)).toBe(2);
    });
});