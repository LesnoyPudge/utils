import { never } from './never';



describe('never', () => {
    it('should throw error', () => {
        expect(never).toThrowError(Error);

        expect(() => never('test')).toThrowError('test');
    });
});