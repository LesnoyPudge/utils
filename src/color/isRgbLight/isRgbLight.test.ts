import { isRgbLight } from './isRgbLight';



describe('isRgbLight', () => {
    test('1', () => {
        const colorWhite = [255, 255, 255] as const;
        const colorBlack = [0, 0, 0] as const;

        expect(isRgbLight(colorWhite)).toBe(true);
        expect(isRgbLight(colorBlack)).toBe(false);
    });
});