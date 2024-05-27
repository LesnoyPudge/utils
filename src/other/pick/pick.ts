import { NonEmptyArray } from "ts-essentials";
import { AnyRecord } from "ts-essentials/dist/any-record";



export const pick = <
    _Source extends AnyRecord, 
    _Keys extends keyof _Source,
>(
    source: _Source,
    ...keys: NonEmptyArray<_Keys>
): Pick<_Source,  _Keys> => {
    const output = keys.reduce<Pick<_Source, _Keys>>((acc, cur) => {
        acc[cur] = source[cur]
        return acc;
    }, {})
 
    return output;
}