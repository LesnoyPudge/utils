import { createElement } from './createElement';



describe('createElement', () => {
    test('1', () => {
        const el = createElement('div', {
            'data-custom': 'custom',
        });

        expect(el.dataset.custom).toBe('custom');
    });
});