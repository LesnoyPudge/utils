import { shallowEqual } from './shallowEqual';



describe('shallowEqual', () => {
    test('1', () => {
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

    test('2', () => {
        expect(shallowEqual(1, 1)).toBe(true);
        expect(shallowEqual('', '')).toBe(true);
        expect(shallowEqual([], [])).toBe(true);
        expect(shallowEqual(new Map(), new Map())).toBe(true);
    });
});