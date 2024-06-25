import { hexToRgb } from '@root';



describe('hexToRgb', () => {
    test('1', () => {
        const rgb1 = hexToRgb('#24f053');
        const rgb2 = hexToRgb('#03f');

        expect(rgb1).toStrictEqual([36, 240, 83]);
        expect(rgb2).toStrictEqual([0, 51, 255]);
    });
});