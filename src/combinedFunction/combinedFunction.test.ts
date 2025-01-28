import { Counter } from '@root/Counter';
import { combinedFunction } from './combinedFunction';



describe('combinedFunction', () => {
    test('1', () => {
        const c = new Counter();

        const combined = combinedFunction(
            c.inc,
            c.inc,
            c.inc,
        );

        combined();

        expect(c.get()).toBe(3);
    });
});