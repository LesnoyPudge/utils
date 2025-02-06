import { pick } from './pick';



describe('pick', () => {
    it('should create new object from specified fields', () => {
        const original = {
            a: 1,
            b: 2,
            c: 3,
        };

        const selected = pick(original, 'a', 'c');

        expect(selected).toEqual({ a: 1, c: 3 });
    });
});