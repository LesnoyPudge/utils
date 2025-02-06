import { css } from './css';



describe('css', () => {
    it('should return same string', () => {
        const res = css`
            html {
                color: 'red'
            }
        `;

        expect(res).toBe(`
            html {
                color: 'red'
            }
        `);
    });
});