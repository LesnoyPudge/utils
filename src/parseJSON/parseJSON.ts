import { catchError } from '@root/catchError';



/**
 * Safely parses JSON.
 * Returns undefined on error.
 */
export const parseJSON = (
    ...params: Parameters<typeof JSON.parse>
) => {
    return catchError(() => JSON.parse(...params))[0];
};