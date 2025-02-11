


/**
 * Returns value at provided index.
 *
 * Throws error if index is out of bounds.
 */
export const inArray = <_Item>(
    items: _Item[],
    index: number,
): _Item => {
    if ((items.length - 1) < index) throw new Error('Index is not in array');

    return items[index] as _Item;
};