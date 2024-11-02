import { T } from '@lesnoypudge/types-utils-base/namespace';
import * as v from 'valibot';



type TypeToValidate = {
    status: 'online' | 'offline';
    id: string;
    login?: string;
    username?: string;
    avatarId: string | null;
    email: string | null;
    extraStatus: 'default' | 'afk' | 'dnd' | 'invisible';
    isActivated: boolean;
    friends: string[];
    blocked: string[];
    channels: string[];
    privateChannels: {
        id: string;
        hidden: boolean;
    }[];
    friendRequests: {
        incoming: {
            from: string;
            createdAt: number;
        }[];
        outgoing: {
            to: string;
            createdAt: number;
        }[];
    };
    isDeleted: boolean;
    createdAt: number;
    settings: {
        theme: 'auto' | 'dark' | 'light';
        fontSize: 12 | 14 | 16 | 18 | 20;
        messageGroupSpacing: 16 | 20;
        messageDisplayMode: 'cozy' | 'compact';
    };
    password: string;
    refreshToken: string;
    accessCode: {
        code: string;
        expiresAt: number;
    };
};

type SmallOjb = {
    a: string;
    b: string | number;
};

// declare module 'valibot' {
//     function object<
//         _Shape extends Record<string, unknown>,
//     >(
//         entries: Record<
//             keyof _Shape,
//             v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>
//         >
//     ): v.ObjectSchema<typeof entries, undefined>;
// }


// const schema = v.object<SmallOjb>({
//     a: v.string(),
//     b: v.number(),
// });

// const res = v.safeParse(schema, {
//     a: 'qwe',
//     b: 5,
// });

// const someSchema: v.ObjectSchema<
//     Record<
//         keyof SmallOjb,
//         v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>
//     >,
//     undefined
// > = v.pipe(
//     v.object({
//         a: v.string(),
//         b: v.string(),
//     }),
//     v.forward(
//         v.check(({ a, b }) => a === b),
//         ['b'],
//     ),
// );

const validate = async (
    shape: Partial<Record<string, ReturnType<typeof createValidator>[]>>,
    input: Record<string, unknown>,
) => {
    const result = {
        message: 'unset message',
        success: false,
    };

    console.log('in validate');

    for (const key of Object.keys(shape)) {
        const validatorArray = shape[key];
        if (!validatorArray) continue;

        const inputValue = input[key];

        for (const validator of validatorArray) {
            const validatorResult = await validator.run(inputValue, input);
            if (validatorResult.message) {
                result.message = validatorResult.message;
            }
            result.success = validatorResult.success;

            if (!validatorResult.success) {
                break;
            }
        }
    }

    return result;
};

// Нужно 3 вида Node
// 1: Validator (isNumber)
// 2: Transformer (trim)
// 3: Modifier (not, msg)

const createValidator = <
    _Shape extends Record<string, unknown>,
    _Value extends T.ValueOf<_Shape>,
>(fn: (
    value: _Value,
    shape: _Shape
) => Promise<string> | Promise<void> | boolean) => {
    // const result = {
    //     message: 'unset message',
    //     success: false,
    // };

    // const msg = (newMessage: string) => {
    //     result.message = newMessage;
    //     return result;
    // };

    // const run = async (value: _Value, shape: _Shape) => {
    //     try {
    //         const res = await fn(value, shape);
    //         if (typeof res === 'boolean') {
    //             result.success = res;
    //         } else {
    //             result.success = true;
    //         }
    //     } catch (error) {
    //         result.success = false;
    //     }

    //     return result;
    // };

    const result = {
        message: 'unset message',
        success: false,
        msg: function (newMessage: string) {
            this.message = newMessage;
            return result;
        },
        run: async function (value: _Value, shape: _Shape) {
            try {
                const res = await fn(value, shape);
                if (typeof res === 'boolean') {
                    this.success = res;
                    return result;
                }
                this.success = true;
            } catch (error) {
                this.success = false;
            }

            return this;
        },

    };

    return result;
};

const _ = {
    isAdmin: () => {
        return createValidator(() => {
            console.log('isAdmin');
            return Promise.resolve();
        });
    },
    custom: createValidator,
    not: () => {},
};

const serverValidator = <
    _Input extends Record<string, unknown>,
>(
    shapeFactory: (
        values: _Input,
    ) => {
        [_Key in keyof _Input]: (
            ReturnType<typeof createValidator<
                _Input,
                _Input[_Key]
            >>
        )[]
    },
    // shapeFactory: (
    //     values: _Input
    // ) => Partial<{
    //     [_Key in keyof _Input]: ReturnType<
    //         typeof createValidator<_Input, _Input[_Key]>
    //     >[]
    // }>,
) => {
    const schema = v.checkAsync(async (input: _Input) => {
        // const shape = shapeFactory(input);
        // const res = await validate(shape, input);
        // console.log('server res:', res);
        // v.setSpecificMessage(schema.reference, res.message);

        // return res.success;
        // v.setSchemaMessage('qwezxc');
        // schema. = 'qwezxc';
        return true;
    });

    return schema;
};

const smallObjSharedSchema: v.GenericSchema<SmallOjb> = v.object({
    a: v.string(),
    b: v.union([
        v.pipe(
            v.string(),
            v.nonEmpty(),
        ),
        v.pipe(
            v.number('not number or string'),
            v.union([
                v.literal(5),
                v.literal(6),
            ]),
        ),
    ]),
});

const genSchema: v.GenericSchemaAsync<SmallOjb> = v.pipeAsync(
    // v.object({
    //     a: v.string(),
    //     b: v.union([
    //         v.pipe(
    //             v.string(),
    //             v.nonEmpty(),
    //         ),
    //         v.pipe(
    //             v.number('not number or string'),
    //             // v.check((val) => {
    //             //     console.log('check inside b');
    //             //     // v.setSchemaMessage('check in b failed');
    //             //     // throw new Error('check in b failed');
    //             //     return true;
    //             // }, 'check failed inside b'),
    //             v.union([
    //                 v.literal(5),
    //                 v.literal(6),
    //                 // v.pipe(
    //                 //     v.number(),
    //                 //     v.check(() => false, 'not 5 or 6 inside'),
    //                 // ),
    //                 // v.check(() => {
    //                 //     v.setSchemaMessage('check in b failed');
    //                 //     return false;
    //                 // }, 'q')
    //             ], 'not 5 or 6'),
    //         ),
    //     ]),
    // }, 'type errorrrr'),

    smallObjSharedSchema,

    // v.forward(
    //     v.partialCheck(
    //         [['a']],
    //         ({ a }) => {
    //             console.log('partial check');
    //             return true;
    //         },
    //         'partial error',
    //     ),
    //     ['a'],
    // ),

    // v.check(() => {
    //     console.log('check 1');
    //     return true;
    // }, 'check error'),

    serverValidator((inp) => ({
        a: [

            // _.isAdmin().msg('No Access Permission'),
            // // _.custom(Number.isNaN).msg('non nan'),
            _.custom((value, input) => {
                console.log('in custom');
                console.log({
                    input,
                    value,
                });
                return true;
            }),
        ],
        b: [
            // (val, inp) => {},
        ],
    })),

    v.check((val) => true),
    // serverValidator(() => ({

    // })),
);

const res = await v.safeParseAsync(genSchema, {
    a: '',
    b: 5,
}, {
    abortEarly: true,
    abortPipeEarly: true,
});
// const res2 = v.parseAsync(genSchema, {});
console.log('res:');

console.log({
    success: res.success,
    dotPath: res.issues ? v.getDotPath(res.issues[0]) : null,
    value: res.issues?.[0].received,
    message: res.issues?.[0].message,
});


// const testSchema = v.pipe(
//     v.object({
//         a: v.string(),
//         b: v.string(),
//     }),
//     v.partialCheck(
//         [['a'], ['b']],
//         ({ a, b }) => {
//             return a === b;
//         },
//     ),
// );

// const testRes = v.parse(testSchema, {});

// const SomeItemSchema = v.parse(v.pipe(
//     v.array(v.object({ id: v.string() })),
//     v.nonEmpty(),
//     v.someItem((item) => !!item.id),
// ), {});

// const RegisterSchema = v.pipe(
//     v.object({
//       email: v.pipe(
//         v.string(),
//         v.nonEmpty('Please enter your email.'),
//         v.email('The email address is badly formatted.'),
//       ),
//       password1: v.pipe(
//         v.string(),
//         v.nonEmpty('Please enter your password.'),
//         v.minLength(8, 'Your password must have 8 characters or more.'),
//       ),
//       password2: v.string(),
//     }),
//     v.forward(
//       v.partialCheck(
//         [['password1'], ['password2']],
//         (input) => input.password1 === input.password2,
//         'The two passwords do not match.',
//       ),
//       ['password2'],
//     ),
//   );
// const res = v.safeParse(
//     v.pipe(
//         // v.looseObject(
//         //     {
//         //     // a: v.string(),
//         //     } as unknown as Record<
//         //         'a',
//         //     // keyof SmallOjb,
//         //         v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>
//         //     >,
//         // ),
//         v.object({
//             a: v.string(),
//         }),
//         // v.variant('a', [
//         //     v.object({
//         //         a: v.check((val) => {
//         //             return true,
//         //         })
//         //     }),

//         // ])
//         // v.object({
//         //     a: v.pipe(
//         //         v.string(),
//         //         v.variant('a', [
//         //             v.check(() => {

//         //             }),
//         //         ]),
//         //     ),
//         // }),
//         v.forward(
//             v.check(({ }) => {
//                 console.log('hello');
//                 return true;
//             }, 'qwe'),
//             ['a'],
//         ),
//     ),
//     {
//         a: 'qwe',
//     },
//     {
//         abortEarly: true,
//         abortPipeEarly: true,
//     },
// );


console.dir({
    ...res,
    // issues: 'hidden',
}, {
    colors: true,
    depth: Infinity,
});