import { css } from './css';



describe('css', () => {
    test('1', () => {
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