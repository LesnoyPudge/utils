


export const catchError = <
    _Value,
>(
    fn: () => _Value,
): (
    [_Value, undefined]
    | [undefined, Error]
) => {
    try {
        return [fn(), undefined];
    } catch (e) {
        const error = (
            e instanceof Error
                ? e
                : new Error(String(e))
        );

        return [undefined, error];
    }
};