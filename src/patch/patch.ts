import { T } from '@lesnoypudge/types-utils-base/namespace';
import { isCallable } from '@root/libs';



export namespace patch {
    export type GetNamesOfMethods<
        _ObjectToPatch extends object,
    > = keyof T.ConditionalPick<
        _ObjectToPatch,
        T.AnyFunction
    >;

    export type GetPatchedMethod<
        _ObjectToPatch extends object,
        _MethodName extends GetNamesOfMethods<_ObjectToPatch>,
    > = (
        _ObjectToPatch[_MethodName] extends T.AnyFunction
            ? _ObjectToPatch[_MethodName]
            : never
    );

    export type GetPatchedMethodFactory<
        _ObjectToPatch extends object,
        _MethodName extends GetNamesOfMethods<_ObjectToPatch>,
        _PatchedMethod extends patch.GetPatchedMethod<
            _ObjectToPatch,
            _MethodName
        >,
    > = (
        _PatchedMethod extends never
            ? never
            : (originalMethod: _PatchedMethod) => _PatchedMethod
    );
}

export const patch = <
    _ObjectToPatch extends object,
    _MethodName extends patch.GetNamesOfMethods<_ObjectToPatch>,
    _PatchedMethod extends patch.GetPatchedMethod<_ObjectToPatch, _MethodName>,
>(
    objectToPatch: _ObjectToPatch,
    methodName: _MethodName,
    patchedMethodFactory: patch.GetPatchedMethodFactory<
        _ObjectToPatch,
        _MethodName,
        _PatchedMethod
    >,
): () => void => {
    const originalMethod = objectToPatch[methodName];

    if (isCallable(originalMethod)) {
        const patchedMethod = patchedMethodFactory(
            originalMethod.bind(objectToPatch),
        );

        // @ts-expect-error
        objectToPatch[methodName] = patchedMethod.bind(objectToPatch);
    }

    const restore = () => {
        objectToPatch[methodName] = originalMethod;
    };

    return restore;
};