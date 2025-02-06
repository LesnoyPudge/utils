import { createId } from './createId';



describe('createId', () => {
    it('should create random string', () => {
        const firstId = createId();
        const secondId = createId();

        expect(firstId).toBeTypeOf('string');
        expect(firstId).not.toBe(secondId);
    });
});