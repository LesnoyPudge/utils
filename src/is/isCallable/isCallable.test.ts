/* eslint-disable @typescript-eslint/no-empty-function */
import { isCallable } from './isCallable';




describe('isCallable', () => {
    test('1', () => {
        expect(isCallable(() => {})).toBe(true);
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        expect(isCallable(function fn() {})).toBe(true);
        expect(isCallable(null)).toBe(false);
        expect(isCallable(new RegExp(''))).toBe(false);
        expect(isCallable({})).toBe(false);
    });
});