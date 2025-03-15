


type SortFnWithSelectors<_Value> = {
    (a: number, b: number): number;

    /**
     * Function for deriving number from provided value.
     */
    select: <_Value>(
        selectFn: (ab: _Value) => number
    ) => (a: _Value, b: _Value) => number;
};

const withSelectors = <_Value>(
    fn: (a: number, b: number) => number,
): SortFnWithSelectors<_Value> => {
    (fn as SortFnWithSelectors<_Value>).select = (selectFn) => {
        return (a, b) => fn(selectFn(a), selectFn(b));
    };

    return fn as SortFnWithSelectors<_Value>;
};


/**
 * Sort numbers from smallest to biggest.
 *
 * Alias to smallToBig.
 */
const ascending = withSelectors((a: number, b: number) => {
    return a - b;
});

/**
 * Sort numbers from smallest to biggest.
 *
 * Alias to ascending.
 */
const smallToBig = ascending;

/**
 * Sort numbers from biggest to smallest.
 *
 * Alias to bigToSmall.
 */
const descending = withSelectors((a: number, b: number) => {
    return b - a;
});

/**
 * Sort numbers from biggest to smallest.
 *
 * Alias to descending.
 */
const bigToSmall = descending;

/**
 * A collection of sorting functions.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */

export const sortFns = {
    ascending,
    smallToBig,
    descending,
    bigToSmall,
};