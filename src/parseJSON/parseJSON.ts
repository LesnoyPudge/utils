import { catchError } from '@root';



export const parseJSON = (
    ...params: Parameters<typeof JSON.parse>
) => {
    return catchError(() => JSON.parse(...params))[0];
};