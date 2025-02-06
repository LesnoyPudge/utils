


/**
 * Throws error on call.
 */
export const never = (message = 'Reached unreachable code') => {
    throw new Error(message);
};