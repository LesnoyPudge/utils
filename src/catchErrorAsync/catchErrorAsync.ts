


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
            e instanceof Error
                ? e
                : new Error(String(e))
        );

        return [undefined, error];
    }
};