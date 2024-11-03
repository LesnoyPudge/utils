import { T } from '@lesnoypudge/types-utils-base/namespace';
import { autoBind, catchError, catchErrorAsync, toPromise } from '@root';
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



const t = (key: string) => 'default_validation_error_message';

export namespace Checker {
    export type PossibleCheckOutput = (
        | Promise<void>
        | boolean
    );

    export type CheckFn<_Value, _Shape> = (
        value: _Value,
        shape: _Shape,
    ) => PossibleCheckOutput;
}

class Checker<
    _Shape extends Record<string, unknown>,
    _Value extends T.ValueOf<_Shape>,
> {
    message: string | null;
    success: boolean;
    private initialMessage: string | null;
    private isNegated: boolean;
    private checkFn: Checker.CheckFn<_Value, _Shape>;

    constructor(
        checkFn: Checker.CheckFn<_Value, _Shape>,
        message: string | null = null,
    ) {
        this.initialMessage = message;
        this.message = message;
        this.success = false;
        this.isNegated = false;
        this.checkFn = checkFn;

        autoBind(this);
    }

    msg(newMessage: string) {
        this.message = newMessage;
        return this;
    }

    not() {
        this.isNegated = true;
        return this;
    }

    async _run(value: _Value, shape: _Shape) {
        const [result, error] = await catchErrorAsync(
            () => toPromise(this.checkFn)(value, shape)
        );

        if (error) {
            this.message = error.message ?? this.message;
            this.success = this.isNegated;
            
            return this;
        }

        if (typeof result === 'boolean') {
            this.success = this.isNegated ? !result : result;
            
            return this;
        }

        this.success = true;

        return this;
    }

    _reset() {
        this.success = false;
        this.message = this.initialMessage;
    }
}

const checker = <
    _Shape extends Record<string, unknown>,
    _Value extends T.ValueOf<_Shape>,
>(
    ...args: ConstructorParameters<typeof Checker<_Shape, _Value>>
) => new Checker(...args);


// type ValidationSchema<_Shape extends T.UnknownRecord> = {
//     [_Key in keyof _Shape]: (
//         any
//     )[]
// };

// const createValidator = <
//     _Shape extends Record<string, unknown>,
//     _Value extends T.ValueOf<_Shape>,
// >(fn: (
//     value: _Value,
//     shape: _Shape
// ) => Promise<string> | Promise<void> | boolean) => {
//     // const result = {
//     //     message: 'unset message',
//     //     success: false,
//     // };

//     // const msg = (newMessage: string) => {
//     //     result.message = newMessage;
//     //     return result;
//     // };

//     // const run = async (value: _Value, shape: _Shape) => {
//     //     try {
//     //         const res = await fn(value, shape);
//     //         if (typeof res === 'boolean') {
//     //             result.success = res;
//     //         } else {
//     //             result.success = true;
//     //         }
//     //     } catch (error) {
//     //         result.success = false;
//     //     }

//     //     return result;
//     // };

//     const result = {
//         message: 'unset message',
//         success: false,
//         msg: function (newMessage: string) {
//             this.message = newMessage;
//             return result;
//         },
//         run: async function (value: _Value, shape: _Shape) {
//             try {
//                 const res = await fn(value, shape);
//                 if (typeof res === 'boolean') {
//                     this.success = res;
//                     return result;
//                 }
//                 this.success = true;
//             } catch (error) {
//                 this.success = false;
//             }

//             return this;
//         },

//     };

//     return result;
// };

const _ = {
    isAdmin: () => {
        return new Checker(() => {
            console.log('isAdmin');
            return Promise.resolve();
        });
    },
    check: checker,
};

type ValidationSchema<
    _Input extends Record<string, unknown>
> = Partial<{
    [_Key in keyof _Input]: (
        Checker<_Input, _Input[_Key]>
    )[]
}>;

// const validate = async (
//     shape: Partial<Record<string, Checker<T.UnknownRecord, unknown>[]>>,
//     input: Record<string, unknown>,
// ) => {
//     const result = {
//         message: 'unset message',
//         success: false,
//     };

//     console.log('in validate');

//     for (const key of Object.keys(shape)) {
//         const validatorArray = shape[key];
//         if (!validatorArray) continue;

//         const inputValue = input[key];

//         for (const validator of validatorArray) {
//             const validatorResult = await validator.run(inputValue, input);
//             if (validatorResult.message) {
//                 result.message = validatorResult.message;
//             }
//             result.success = validatorResult.success;

//             if (!validatorResult.success) {
//                 break;
//             }
//         }
//     }

//     return result;
// };

class Validator {
    message: string;
    success: boolean;
    path: string | null;

    constructor() {
        this.message = t('');
        this.success = false;
        this.path = null;
    }

    reset() {
        this.message = t('');
        this.success = false;
        this.path = null;
    }

    async validate<_Input extends T.UnknownRecord>(
        input: _Input,
        schema: ValidationSchema<_Input>,
    ) {
        keysLoop: for (const key of Object.keys(schema)) {
            const checkerArray = schema[key];
            if (!checkerArray) continue;
    
            const inputValue = input[key] as _Input[string];
    
            for (const checker of checkerArray) {
                const checkerResult = await checker._run(inputValue, input);
                
                if (checkerResult.message) {
                    this.message = checkerResult.message;
                }

                this.path = key;
                this.success = checkerResult.success;
                
                checker._reset()

                if (!this.success) {
                    break keysLoop;
                }
            }
        }

        return this;
    }
}

const serverValidator = <
    _Input extends T.UnknownRecord,
>(
    schemaFactory: (values: _Input) => ValidationSchema<_Input>,
) => {
    const validator = new Validator();

    const action = v.checkAsync(async (input: _Input) => {
        const schema = schemaFactory(input);    
        const {
            success,
            message,
            path,
        } = await validator.validate(input, schema)

        v.setSpecificMessage(action.reference, message);

        return success;
    });

    return action;
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
    smallObjSharedSchema,

    serverValidator((inp) => ({
        a: [
            _.isAdmin().msg('No Access Permission'),
            // // _.custom(Number.isNaN).msg('non nan'),
            _.check((value, input) => {
                    // ^?
                console.log('in custom');
                console.log({
                    input,
                    value,
                });
                return true;
            }),
        ],
    })),

    v.check((val) => true),
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

console.dir({
    ...res,
    // issues: 'hidden',
}, {
    colors: true,
    depth: Infinity,
});