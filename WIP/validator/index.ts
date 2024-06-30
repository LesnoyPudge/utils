import { T } from '@lesnoypudge/types-utils-base';
import { pipe } from '@root';
import { TObject } from 'WIP/TObject/TObject';



type ValidatorPipe<
    _Key extends PropertyKey,
    _Shape extends T.UnknownRecord,
> = ReturnType<typeof pipe<
    [field: unknown, shape: Record<keyof _Shape, unknown>],
    (
        Promise<[field: _Shape[_Key], shape: Record<keyof _Shape, unknown>]>
        | [field: _Shape[_Key], shape: Record<keyof _Shape, unknown>]
    )
>>;

type ValidationShape<
    _Shape extends T.UnknownRecord,
> = {
    [_Key in keyof _Shape]: ValidatorPipe<_Key, _Shape>;
};

type ValidationSuccess = {
    success: true;
};

type ValidationFail<
    _Shape extends T.UnknownRecord,
> = {
    success: false;
    message: string;
    field: keyof _Shape;
    value: unknown;
};

type ValidationResult<
    _Shape extends T.UnknownRecord,
> = ValidationSuccess | ValidationFail<_Shape>;

type Validator<
    _Shape extends T.UnknownRecord,
> = (
    validationShape: Record<keyof _Shape, unknown>
) => Promise<ValidationResult<_Shape>>;

export const createValidator = <
    _Shape extends T.UnknownRecord,
>(
    validationShape: ValidationShape<_Shape>,
): Validator<_Shape> => {
    return async (shape) => {
        let result: ValidationResult<_Shape> = {
            success: true,
        };

        for (const key of TObject.keys(validationShape)) {
            const func = () => validationShape[key](shape[key], shape);

            try {
                await func();

                result = {
                    success: true,
                };
            } catch (error) {
                result = {
                    success: false,
                    field: String(key),
                    message: String(error),
                    value: shape[key],
                };
            }

            if (!result.success) {
                break;
            }
        }

        return result;
    };
};

const extendValidator = () => {};


import z from 'zod';


type User = {
    email: string;
};

type Person = {
    name: string;
    age?: number;
    sex: 'male' | 'female' | 'other' | null;
};


const schema = z.object<{
    [_Key in keyof Person]: z.ZodTypeAny
}>({
    name: z.string(),
    sex: z.string().refine((sex): sex is 'male' | 'female' | 'other' => {
        return ['male', 'female', 'other'].includes(sex);
    }).nullable(),
    age: z.number().optional(),
});

const qwezxc = schema.extend({
});

type TypeToValidate = {
    status: 'online' | 'offline';
    id: string;
    login: string;
    username: string;
    avatarId: string;
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

type Test = {
    some: string;
};

const testShape: Test = {
    some: 'qwe',
};


const t = <
    _Shape extends T.UnknownRecord,
>(
    // schema: _Schema,
) => {
    return <
        _Schema extends Record<keyof _Shape, z.ZodTypeAny>,
    >(schema: _Schema) => {
        return schema;
    };

    // return schema;
};

// const t3 = <_Shape extends T.UnknownRecord>() => t<_Shape>();

const qwe123 = t<Test>()({
    some: z.string(),
});

const t2 = <
    _Shape extends Record<string, unknown>,
>(
    schema: _Shape,
): T.Simplify<T.Writable<_Shape>> => {
    return schema as T.Writable<_Shape>;
};

const zxc123 = t2({
    some: 'qwe',
} as const);

const s = (<
    _Shape extends T.UnknownRecord,
>() => {
    return <
        _Schema extends Record<keyof _Shape, z.ZodTypeAny>,
    >(schema: _Schema) => {
        return schema;
    };
})();



const createValidator2 = <
    _Shape extends T.UnknownRecord,
>() => {
    // const schema = schemaFn(shape);

    return <_Return extends Record<keyof _Shape, z.ZodTypeAny>>(
        schemaFn: (
            shape: Record<keyof _Shape, unknown>
        ) => {
            [_Key in keyof _Shape]: T.ValueOf<Pick<_Return, _Key>>
        },
    ) => {
        return {
            run: (shape: Record<keyof _Shape, unknown>) => {
                return schemaFn(shape);
            },
            extend: <
                _Schema extends Record<keyof _Shape, z.ZodTypeAny>,
                _ExtendedSchema extends _Schema,
            >(
                extendSchemaFn: (
                    prev: typeof schemaFn,
                    shape: _Shape
                ) => _ExtendedSchema,
            ) => {
                return;
                // return (shape: Record<keyof _Shape, unknown>) => {

                // }
            },
        };
    };
};

const sharedValidator = createValidator2<Test>()((shape) => ({
    some: z.string(),
}));

sharedValidator.run(testShape);

const serverValidator = createValidator2<Test>()((shape) => {
    const prev = sharedValidator.run(shape);
    return {
        some: prev.some.refine((val) => {
            return true;
        }),
    };
});

// const serverValidator = sharedValidator.extend((prev, shape) => ({
//     some: prev(shape).some.refine((val) => {
//         return true;
//     }),
// }));

serverValidator.run(testShape);

// const serverValidator = createValidator<Test>((shape) => ({
//     some: sharedValidator.some.refine((val) => {
//         return true;
//     })
// }))

// const validator = async <
//     _Shape extends T.UnknownRecord,
// >(
//     schema: z.ZodObject<Record<keyof _Shape, z.ZodTypeAny>>,
// ) => {
//     const qwe = await schema.safeParseAsync(value);

//     if (!qwe.success) {
//         throw new Error(qwe.error.message);
//     }

//     return qwe.data;
// };

// const validate = async <
//     _Shape extends T.UnknownRecord,
// >(
//     value: Partial<Record<keyof _Shape, unknown>>,
//     schema: z.ZodObject<Record<keyof _Shape, z.ZodTypeAny>>,
// ) => {
//     const qwe = await schema.safeParseAsync(value);

//     if (!qwe.success) {
//         throw new Error(qwe.error.message);
//     }

//     return qwe.data;
// };

// const testSchema = validate<TypeToValidate>(z.object({

// }))



type qwe2 = T.ArrayValues<['some', 'data']>;

type qwe3 = keyof ['some', 'data'];
// const oneOf = <
//     _Value extends string,
//     _Array extends string[],
// >(value: _Value, arr: _Array): value is T.ArrayValues<_Array> => {
//     return arr.includes(value)
// }

const str = '';

// if (oneOf(str, ['wow', 'some'])) {
//     str
// }

// const qweqwe = oneOf('qwe', ['zxc', 'wow'])

const zxc = z.string().refine((sex): sex is 'male' | 'female' | 'other' => {
    return ['male', 'female', 'other'].includes(sex);
}).refine(async () => {
    return true;
}).nullable();



// const v = new Validator();



// const schema = z.object<z.ZodSchema<Person>>({
//     name: z.string({
//         required_error: 'Name is required',
//         invalid_type_error: 'Name must be a string',
//     }),
//     phone: z.number({
//         required_error: 'Phone number is required',
//         invalid_type_error: 'Phone must be a number',
//     }),
//     confirmPhone: z.number({}).refine((arg): arg is 5 | 2 => {
//         return [1, 2, 3].includes(arg);
//     }),
// }).refine((data) => data.phone === data.confirmPhone, {
//     message: 'Phone numbers dont match',
// });


import v from 'yup';



// will raise a compile-time type error if the schema does not produce a valid Person
const schema2: v.ObjectSchema<Person> = v.object({
  name: v.string().defined(),
  age: v.number().optional(),
  sex: v.string<'male' | 'female' | 'other'>().nullable().defined(),
});

// ❌ errors:
// "Type 'number | undefined' is not assignable to type 'string'."

type ValueToSchema<_Value> = (
        _Value extends number
            ? v.NumberSchema
            : _Value extends string
                ? v.StringSchema
                : _Value extends boolean
                    ? v.BooleanSchema
                    : _Value extends T.UnknownRecord
                        ? v.ObjectSchema<
                            ValueToSchema<_Value>,
                            ValueToSchema<_Value>
                        >
                        : _Value extends any[]
                            ? v.ArraySchema<_Value, _Value>
                            : never
);

type RecordToSchema<
    _Shape extends T.UnknownRecord,
> = {
    [_Key in keyof _Shape]: ValueToSchema<_Shape[_Key]>;
};

const badSchema = v.object({
    // name: v.number(),
    // email: v.string().defined(),
    name: v.string(),
    sex: v.string().is(['male', 'female', 'other']).nullable(),
} satisfies RecordToSchema<Person>);

const qwe = await badSchema.validate({});



// server only
// const SomeValidator = extendValidator(SomeSharedValidator, {});

// SomeValidator.createUser;