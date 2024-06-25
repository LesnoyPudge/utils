import { inRange } from '@root';



export const coinFlip = () => {
    return !!inRange(0, 1);
};