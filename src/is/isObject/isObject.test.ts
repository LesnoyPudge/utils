import { isObject } from './isObject';



describe('isObject', () => {
    test('1', () => {
        expect(isObject({})).toBe(true);
        expect(isObject([])).toBe(true);
    });
});