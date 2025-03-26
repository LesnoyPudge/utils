import { unhandled } from './unhandled';



describe('unhandled', () => {
    it('should throw', () => {
        // @ts-expect-error
        expect(() => unhandled(1)).toThrow();
    });

    it('should take value of never', () => {
        expectTypeOf(unhandled).parameter(0).toBeNever();
    });
});