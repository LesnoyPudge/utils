import { createJsonView } from './createJsonView';



describe('createJsonView', () => {
    test('1', () => {
        const str = createJsonView(JSON.stringify({ data: 'some' }));

        expect(str).toBeTypeOf('string');
    });

    test('2', () => {
        const pre = createJsonView(
            JSON.stringify({ data: 'some' }),
            {
                asHTML: true,
                className: 'some-cn',
            },
        );

        expect(pre).toBeTypeOf('object');
        expect(pre?.tagName).toBe('PRE');
        expect(pre?.className).toBe('some-cn');
    });

    test('3', () => {
        const error = createJsonView('{');

        expect(error).toBe(null);
    });
});