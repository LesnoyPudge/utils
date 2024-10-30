import { catchError } from '@root';



export const parseJSON = <_ExpectedValue>(
    ...params: Parameters<typeof JSON.parse>
): _ExpectedValue | undefined => {
    return catchError(() => JSON.parse(...params) as _ExpectedValue)[0];
};