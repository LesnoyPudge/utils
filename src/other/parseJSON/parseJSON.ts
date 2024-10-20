import { catchError } from '@root';



export const parseJSON = <ExpectedValue = unknown>(
    ...params: Parameters<typeof JSON.parse>
): ExpectedValue | undefined => {
    return catchError(() => JSON.parse(...params) as ExpectedValue);
};