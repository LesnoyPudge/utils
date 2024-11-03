


export const catchErrorAsync = async<
    _Value,
>(
    fn: () => PromiseLike<_Value>,
): Promise<
    [_Value, undefined]
    | [undefined, Error]
> => {
    try {
        const value = await fn();
        return [value, undefined];
    } catch (e) {
        const error = (
            !(e instanceof Error)
                ? new Error(String(e))
                : e
        );

        return [undefined, error];
    }
};