import { shallowEqual } from './shallowEqual';



describe('shallowEqual', () => {
    it('should shallowly compare values', () => {
        expect(shallowEqual({
            data: '',
        }, {
            data: '',
        })).toBe(true);

        expect(shallowEqual({
            data: '',
        }, {
            data: '',
            some: 5,
        })).toBe(false);
    });

    it('should work with different data types', () => {
        expect(shallowEqual(1, 1)).toBe(true);
        expect(shallowEqual('', '')).toBe(true);
        expect(shallowEqual([], [])).toBe(true);
        expect(shallowEqual(new Map(), new Map())).toBe(true);
    });
});