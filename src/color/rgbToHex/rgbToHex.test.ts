import { rgbToHex } from "@root"



describe('rgbToHex', () => {
    test('1', () => {
        const hex = rgbToHex([36, 240, 83])

        expect(hex).toBe('#24f053')
    })
})