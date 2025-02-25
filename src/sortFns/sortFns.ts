


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort


/**
 * A collection of sorting functions.
 */
export const sortFns = {
    /**
     * Sorts numbers in ascending order.
     */
    ascending: (a: number, b: number) => {
        return a - b;
    },

    /**
     * Sorts numbers in descending order.
     */
    descending: (a: number, b: number) => {
        return b - a;
    },
};