


/**
 * Returns true with provided probability, false otherwise.
 */
export const chance = (probability: number) => {
    return Math.random() < probability;
};