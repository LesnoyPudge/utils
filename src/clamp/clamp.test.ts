import { clamp } from './clamp';



describe('clamp', () => {
    test('base', () => {
        expect(clamp(0, 15, 20)).toBe(15);

        expect(clamp(0, 15, 13)).toBe(13);

        expect(clamp(0, -5, 10)).toBe(0);

        expect(clamp(10, 15, 0)).toBe(10);

        expect(clamp(10, -15, 0)).toBe(0);

        expect(clamp(10, 15, 10)).toBe(10);

        expect(clamp(10, -15, 10)).toBe(10);

        expect(clamp(10, Number.NaN, 10)).toBe(Number.NaN);

        expect(clamp(Number.NaN, 10, Number.NaN)).toBe(Number.NaN);

        expect(clamp(Number.NaN, Number.NaN, Number.NaN)).toBe(Number.NaN);

        expect(clamp(10, Infinity, 15)).toBe(15);

        expect(clamp(10, -Infinity, 15)).toBe(10);

        expect(clamp(0, -0, 0)).toBe(0);

        expect(clamp(-0, -0, 0)).toBe(-0);
    });
});