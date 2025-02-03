/* eslint-disable unicorn/consistent-function-scoping */
import { patch } from './patch';



describe('patch', () => {
    it('should patch the method and restore it', () => {
        const objectToPatch = {
            add: (a: number, b: number) => a + b,
        };

        const restore = patch(
            objectToPatch,
            'add',
            () => (a, b) => a * b,
        );

        expect(objectToPatch.add(2, 3)).toBe(6);

        restore();

        expect(objectToPatch.add(2, 3)).toBe(5);
    });

    it('should handle patching methods on classes that rely on `this`', () => {
        class Calculator {
            count = 5;

            add(val: number) {
                this.count += val;

                return this.count;
            }
        }

        const calculator = new Calculator();

        patch(
            calculator,
            'add',
            (originalMethod) => {
                return (val) => {
                    return originalMethod(val) + 5;
                };
            },
        );

        expect(calculator.add(5)).toBe(15);
    });
});