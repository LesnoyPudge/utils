


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort


/**
 * A collection of sorting functions.
 */
export const sortFns = {
    /**
     * Sorts numbers from lowest to biggest.
     */
    ascending: (a: number, b: number) => {
        return a - b;
    },

    /**
     * Sorts numbers from biggest to lowest.
     */
    descending: (a: number, b: number) => {
        return b - a;
    },
};