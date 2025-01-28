import { catchError } from '@root/catchError';



export const parseJSON = (
    ...params: Parameters<typeof JSON.parse>
) => {
    return catchError(() => JSON.parse(...params))[0];
};