import { T } from '@lesnoypudge/types-utils-base/namespace';



export const pick = <
    _Source extends object,
    _Keys extends keyof _Source,
>(
    source: _Source,
    ...keys: _Keys[]
): T.Simplify<Pick<_Source, _Keys>> => {
    const output = keys.reduce<Pick<_Source, _Keys>>((acc, cur) => {
        acc[cur] = source[cur];
        return acc;
    }, {});

    return output;
};