import { T } from '@lesnoypudge/types-utils-base/namespace';
import { autoBind, catchError, catchErrorAsync, invariant, toPromise } from '@root';
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

const validationPipe = <_Input>(...checks: any[]) => {
    const action = v.checkAsync((_: _Input) => {
        for (const check of checks) {
            
        }
        
        v.setSpecificMessage(action.reference, '');
        
        return true;
    });
    console.log('huh?')
    return action;
}

type Middleware = (req: any, res: any, next: any) => void;

type SomeValidator = {
    [Endpoint.Create.ActionName]: Endpoint.Create.RequestBody,
}

const createValidator = <
    _Shape extends Record<string, T.UnknownRecord>,
>(
    shape: {
        [_Key in keyof _Shape]: (
            (req: {body: _Shape[_Key]}) => v.GenericSchemaAsync<_Shape[_Key]>
        )
    }
): Record<keyof _Shape, Middleware> => {
    return (
        Object
            .keys(shape)
            .reduce<Record<keyof _Shape, Middleware>>((acc, cur) => {
                acc[cur as keyof _Shape] = async(req, _, next) => {
                    const schemaFactory = shape[cur];
                    invariant(schemaFactory);

                    const result = await v.safeParseAsync(
                        schemaFactory(req), 
                        req,
                        {
                            abortEarly: true,
                            abortPipeEarly: true,
                        }
                    );

                    // ... rest express stuff
                }
                return acc;
            }, {})
    )
}

const sv = {} as any;

const SomeValidator = createValidator<SomeValidator>({
    create: (req) => v.pipeAsync(
        smallObjSharedSchema,
        v.check((inp) => true),
        validationPipe(
            sv.channelMember(
                req.auth.id,
                req.body.channelId,
            ),
            sv.channelMember(
                req.body.targetId,
                req.body.channelId,
            ),
            sv.if(sv.not(
                sv.channelOwner(
                    req.auth.id,
                    req.body.channelId,
                ),
            )),
            sv.not(sv.channelOwner(
                req.body.targetId,
                req.body.channelId,
            )),
            sv.all([
                sv.not(
                    sv.permissionAdministrator(
                        req.body.targetId,
                        req.body.channelId,
                    ),
                ),
                sv.oneOf([
                    sv.permissionAdministrator(
                        req.auth.id,
                        req.body.channelId,
                    ),
                    sv.permissionBan(
                        req.auth.id,
                        req.body.channelId,
                    ),
                ]),
            ])
        ),
    )
})

// const genSchema = v.pipeAsync(
//     smallObjSharedSchema,
//     v.check((val) => true),

//     validate(() => [
//         .custom(sv.channelMember(
//             req.auth.id,
//             req.body.channelId,
//         ))
//         .custom(sv.channelMember(
//             req.body.targetId,
//             req.body.channelId,
//         ))
//         .if(sv.not(
//             sv.channelOwner(
//                 req.auth.id,
//                 req.body.channelId,
//             ),
//         ))
//         .not()
//         .custom(sv.channelOwner(
//             req.body.targetId,
//             req.body.channelId,
//         ))
//         .custom(sv.all([
//             sv.not(
//                 sv.permissionAdministrator(
//                     req.body.targetId,
//                     req.body.channelId,
//                 ),
//             ),
//             sv.oneOf([
//                 sv.permissionAdministrator(
//                     req.auth.id,
//                     req.body.channelId,
//                 ),
//                 sv.permissionBan(
//                     req.auth.id,
//                     req.body.channelId,
//                 ),
//             ]),
//         ]))
//     ])
//     v.check((input) => {)
// );

// const [res] = await catchErrorAsync(() => v.parseAsync(genSchema, {}));
//     ^?