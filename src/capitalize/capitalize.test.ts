import { capitalize } from './capitalize';



describe('capitalize', () => {
    test('1', () => {
        expect(capitalize('test')).toBe('Test');
    });
});