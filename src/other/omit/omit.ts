import { T } from '@lesnoypudge/types-utils-base';



export const omit = <
    _Source extends T.UnknownRecord,
    _Keys extends keyof _Source,
>(
    source: _Source,
    ...keys: T.NonEmptyArray<_Keys>
): T.Simplify<Omit<_Source, _Keys>> => {
    return Object.keys(source).reduce<Omit<_Source, _Keys>>((acc, cur) => {
        if (keys.includes(cur)) return acc;
        // @ts-ignore
        acc[cur] = source[cur];
        return acc;
    }, {});
};