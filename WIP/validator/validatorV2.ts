import { T } from '@lesnoypudge/types-utils-base/namespace';
import { catchErrorAsync, invariant, promiseToBoolean, STATUS_CODE } from '@root';
import * as v from 'valibot';



namespace Endpoint {
    export namespace Create {
        export const ActionName = 'create';

        export type RequestBody = {
            a: string;
            b: string | number;
        }
    }
}

const smallObjSharedSchema: v.GenericSchema<Endpoint.Create.RequestBody> = v.object({
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


class Bail extends Error {
    constructor() {
        super();
        this.name = 'ValidationBail';
    }

    static throw() {
        throw new Bail();
    }
}


export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }

    static badRequest(message = 'Неверный запрос') {
        return new ApiError(STATUS_CODE.BAD_REQUEST, message);
    }

    static unauthorized(message = 'Не авторизован') {
        return new ApiError(STATUS_CODE.UNAUTHORIZED, message);
    }

    static notFound(message = 'Не найдено') {
        return new ApiError(STATUS_CODE.NOT_FOUND, message);
    }

    static forbidden(message = 'Доступ запрещён') {
        return new ApiError(STATUS_CODE.FORBIDDEN, message);
    }

    static internal(message = 'Непредвиденная ошибка') {
        return new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, message);
    }
}

type Check = () => Promise<unknown>;

const validationPipe = <_Input>(...checks: Check[]) => {
    return v.checkAsync(async(_: _Input) => {
        for (const check of checks) {
            await check();
        }
        
        return true;
    });
}

type Middleware = (req: any, res: any, next: any) => void;

type SomeValidator = {
    [Endpoint.Create.ActionName]: Endpoint.Create.RequestBody,
}

type ValidatorShape<
    _Shape extends Record<string, T.UnknownRecord>
> = {
    [_Key in keyof _Shape]: (
        (req: {body: _Shape[_Key]}) => v.GenericSchemaAsync<_Shape[_Key]>
    )
}

const createValidator = <
    _Shape extends Record<string, T.UnknownRecord>,
>(
    shape: ValidatorShape<_Shape>
): Record<keyof _Shape, Middleware> => {
    return (
        Object
            .keys(shape)
            .reduce<Record<keyof _Shape, Middleware>>((acc, cur) => {
                acc[cur as keyof _Shape] = async(req, _, next) => {
                    const schemaFactory = shape[cur];
                    invariant(schemaFactory);

                    const [
                        result, 
                        error
                    ] = await catchErrorAsync(() => v.safeParseAsync(
                        schemaFactory(req), 
                        req.body,
                        {
                            abortEarly: true,
                            abortPipeEarly: true,
                        }
                    ));

                    if (result && result.success) return next();
                    if (result && !result.success) {
                        return next(ApiError.badRequest())
                    }
                    
                    invariant(error)

                    if (error instanceof Bail) return next();

                    return next(ApiError.internal())
                }
                return acc;
            }, {})
    )
}

const sv = {
    passIf(check: Check) {
        return async () => {
            const res = await promiseToBoolean(check());
            if (res) Bail.throw();
        }
    },

    failIf(check: Check) {
        return async () => {
            const res = await promiseToBoolean(check());
            if (res) Promise.reject();
        }
    },

    not(check: Check) {
        return async() => {
            const result = await promiseToBoolean(check());
            if (result) return Promise.reject();
        }        
    },
    
    all(...checks: T.NonEmptyArray<Check>) {
        return async () => {
            const res = await Promise.all(
                checks.map((check) => promiseToBoolean(check()))
            );
            if (res.includes(false)) Promise.reject();
        }
    },
    
    oneOf(...checks: T.NonEmptyArray<Check>) {
        return async () => {
            for (const check of checks) {
                const res = await promiseToBoolean(check());
                if (res) return Promise.resolve();
            }

            return Promise.reject();
        }
    },
}

const SomeValidator = createValidator<SomeValidator>({
    create: (req) => v.pipeAsync(
        smallObjSharedSchema,
        v.check((inp) => !!inp.a),
        validationPipe(
            () => {
                console.log('in pipe', req)
                return Promise.resolve()
            }
        ),
    )
})


SomeValidator.create({body: {
    a: 'qwe',
    b: 'zxc',
}}, {}, () => {});