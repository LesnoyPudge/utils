import { clamp } from '@root';



describe('clamp', () => {
    test('base', () => {
        expect(clamp(0, 15, 20)).toBe(15);

        expect(clamp(0, 15, 13)).toBe(13);

        expect(clamp(0, -5, 10)).toBe(0);

        expect(clamp(10, 15, 0)).toBe(10);

        expect(clamp(10, -15, 0)).toBe(0);

        expect(clamp(10, 15, 10)).toBe(10);

        expect(clamp(10, -15, 10)).toBe(10);

        expect(clamp(10, NaN, 10)).toBe(NaN);

        expect(clamp(NaN, 10, NaN)).toBe(NaN);

        expect(clamp(NaN, NaN, NaN)).toBe(NaN);

        expect(clamp(10, Infinity, 15)).toBe(15);

        expect(clamp(10, -Infinity, 15)).toBe(10);

        expect(clamp(0, -0, 0)).toBe(0);

        expect(clamp(-0, -0, 0)).toBe(-0);
    });
});