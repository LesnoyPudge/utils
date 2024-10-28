


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
            !(e instanceof Error)
                ? new Error(String(e))
                : e
        );

        return [undefined, error];
    }
};