/* eslint-disable unicorn/consistent-function-scoping */
import { patch } from './patch';



describe('patch', () => {
    it('should patch the method and restore it', () => {
        const objectToPatch = {
            add: (a: number, b: number) => a + b,
        };

        const restore = patch({
            objectToPatch,
            providedThis: objectToPatch,
            methodName: 'add',
            patchedMethodFactory: () => (a, b) => a * b,
        });

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

        patch({
            objectToPatch: calculator,
            providedThis: calculator,
            methodName: 'add',
            patchedMethodFactory: (originalMethod) => {
                return (val) => {
                    return originalMethod(val) + 5;
                };
            },
        });

        expect(calculator.add(5)).toBe(15);
    });

    it('should patch Date object', () => {
        const restore = patch({
            objectToPatch: Date as DateConstructor,
            methodName: 'now',
            providedThis: Date,
            patchedMethodFactory: () => {
                return () => {
                    return 123;
                };
            },
        });

        expect(Date.now()).toBe(123);

        restore();

        expect(Date.now()).greaterThan(123);
    });
});