import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createValidator } from '.';
import { pipe } from '@root';



type UserId = T.Tagged<string, 'UserId'>;

type User = {
    // id: UserId;
    // name: string;
    email: string | null;
};

describe('validator', () => {
    test('1', async () => {
        const SomeSharedValidator = {
            createUser: createValidator<User>({
                email: pipe((value, shape) => {
                    return [String(value), shape];
                }),
            }),
        };

        const result = await SomeSharedValidator.createUser({
            email: 'qwe',
        });

        expect(result.success).toBe(true);
    });
});