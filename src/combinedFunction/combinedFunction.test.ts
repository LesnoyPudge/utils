import { Counter } from '@root/Counter';
import { combinedFunction } from './combinedFunction';



describe('combinedFunction', () => {
    it('should call every provided functions at once', () => {
        const spy = vi.fn();

        const combined = combinedFunction(
            spy,
            spy,
            spy,
        );

        combined();

        expect(spy).toBeCalledTimes(3);
    });
});