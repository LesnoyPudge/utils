import { chance } from '@root/chance';



/**
 * Returns true or false with equal chance.
 */
export const coinFlip = (): boolean => {
    return chance(0.5);
};