import { capitalize } from './capitalize';



describe('capitalize', () => {
    it('should capitalize string', () => {
        expect(capitalize('test')).toBe('Test');
    });
});