


/**
 * Returns number that is within provided borders.
 */
export const clamp = (
    firstBorder: number,
    current: number,
    secondBorder: number,
) => {
    const min = Math.min(firstBorder, secondBorder);
    const max = Math.max(firstBorder, secondBorder);

    return Math.max(min, Math.min(max, current));
};