import { inRange } from './inRange';



describe('inRange', () => {
    it(`
        should work with: same, decimal, negative 
        and inverted borders    
    `, () => {
        expect(inRange(0, 0)).toBe(0);

        expect(inRange(1, 3)).toBeGreaterThanOrEqual(1);

        expect(inRange(3, 1)).toBeGreaterThanOrEqual(1);

        expect(inRange(-6, 1)).toBeLessThanOrEqual(1);

        expect(inRange(-15, -6)).toBeLessThan(-5);

        expect(inRange(1.1, 1.1)).toBeGreaterThanOrEqual(1);
    });
});