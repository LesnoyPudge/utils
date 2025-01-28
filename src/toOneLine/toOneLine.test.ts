import { toOneLine } from './toOneLine';



describe('toOneLine', () => {
    it('should return single line', () => {
        const multiline = `1
            2
            3   
                4
        5
        `;

        expect(toOneLine(multiline)).toBe('1 2 3 4 5');
    });
});