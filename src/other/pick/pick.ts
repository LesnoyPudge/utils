import { T } from "@lesnoypudge/types-utils-base";



export const pick = <
    _Source extends T.AnyRecord, 
    _Keys extends keyof _Source,
>(
    source: _Source,
    ...keys: T.NonEmptyArray<_Keys>
): T.Prettify<Pick<_Source,  _Keys>> => {
    const output = keys.reduce<Pick<_Source, _Keys>>((acc, cur) => {
        acc[cur] = source[cur]
        return acc;
    }, {})
 
    return output;
}