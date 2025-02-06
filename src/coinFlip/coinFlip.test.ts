import { coinFlip } from './coinFlip';



describe('coinFlip', () => {
    it('should return boolean', () => {
        expect(coinFlip()).toBeTypeOf('boolean');
    });
});