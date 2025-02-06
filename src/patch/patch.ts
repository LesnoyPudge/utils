import { T } from '@lesnoypudge/types-utils-base/namespace';
import { isCallable } from '@root/libs';
import { never } from '@root/never';
import { noop } from '@root/noop';



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
>(options: {
    objectToPatch: _ObjectToPatch;
    providedThis: _ObjectToPatch;
    methodName: _MethodName;
    patchedMethodFactory: patch.GetPatchedMethodFactory<
        _ObjectToPatch,
        _MethodName,
        _PatchedMethod
    >;
}): () => void => {
    const {
        methodName,
        objectToPatch,
        providedThis,
        patchedMethodFactory,
    } = options;

    const originalMethod = objectToPatch[methodName];

    if (!isCallable(originalMethod)) return noop;

    const patchedMethod = patchedMethodFactory(
        originalMethod.bind(providedThis),
    );

    if (!isCallable(patchedMethod)) never('Factory should return function');

    // @ts-expect-error
    objectToPatch[methodName] = patchedMethod.bind(providedThis);

    const restore = () => {
        objectToPatch[methodName] = originalMethod;
    };

    return restore;
};