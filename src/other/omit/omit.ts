import { T } from '@lesnoypudge/types-utils-base';



export const omit = <
    _Source extends T.AnyRecord,
    _Keys extends keyof _Source,
>(
    source: _Source,
    ...keys: T.NonEmptyArray<_Keys>
): T.Prettify<Omit<_Source, _Keys>> => {
    return Object.keys(source).reduce<Omit<_Source, _Keys>>((acc, cur) => {
        if (keys.includes(cur)) return acc;
        // @ts-expect-error
        acc[cur] = source[cur];
        return acc;
    }, {});
};