import { T } from '@lesnoypudge/types-utils-base/namespace';



type TrimLoop<_Arr extends string[]> = _Arr[1] extends undefined
    ? [T.Trim<_Arr[0]>]
    : [T.Trim<_Arr[0]>, ...TrimLoop<T.ArrayTail<_Arr>>]
;

export namespace toOneLine {
    export type Return<_Text extends string> = (
        TrimLoop<
            T.Split<_Text, '\n'>
        > extends [...infer _Arr extends string[]]
            ? T.Trim<T.Join<_Arr, ' '>>
            : never
    );
}

/**
 * Takes string in any format and returns single
 * line with single whitespace between words.
 */
export const toOneLine = <_Text extends string>(
    text: _Text,
) => {
    return (
        text
            .split(/\r?\n/)
            .map((item) => item.trim())
            .join(' ')
            .trim()
    ) as toOneLine.Return<_Text>;
};