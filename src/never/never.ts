


export const never = (message = 'Reached unreachable code') => {
    throw new Error(message);
};