import { createElement } from "@root";



describe('createElement', () => {
    test('1', () => {
        const el = createElement('a', {href: 'example.com'});

        expect(el.href).include('example.com')
    })
})