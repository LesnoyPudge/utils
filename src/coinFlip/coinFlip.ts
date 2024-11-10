import { chance } from '@root';



export const coinFlip = () => {
    return !!chance(0.5);
};