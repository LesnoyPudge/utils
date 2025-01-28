import { chance } from './chance';



describe('chance', () => {
    test('1', () => {
        expect(chance(0)).toBe(false);
        expect(chance(1)).toBe(true);

        expect(chance(-0)).toBe(false);
        expect(chance(-1)).toBe(false);
        expect(chance(-Infinity)).toBe(false);

        expect(chance(10)).toBe(true);
        expect(chance(Infinity)).toBe(true);
    });
});