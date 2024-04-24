import { toCamelCase } from "@root"



describe('toCamelCase', () => {
    test('1', () => {
        expect(toCamelCase('qwe')).toBe('Qwe')
        expect(toCamelCase('QWE')).toBe('Qwe')
        expect(toCamelCase('q')).toBe('Q')
        expect(toCamelCase('')).toBe('')
    })
})