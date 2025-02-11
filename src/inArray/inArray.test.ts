import { inArray } from './inArray';



describe('inArray', () => {
    it('should return value from list', () => {
        const list = [1, 2, 3];

        expect(inArray(list, 0)).toBe(list[0]);
    });

    it('should throw', () => {
        const list = [1, 2, 3];

        expect(() => inArray(list, 3)).toThrowError();
    });
});