import { chance } from '@root/chance';



export const coinFlip = () => {
    return !!chance(0.5);
};