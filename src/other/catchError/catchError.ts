


export const catchError = <
    _Value,
    _FallbackValue = undefined,
>(
    fn: () => _Value,
    fallbackValue?: _FallbackValue,
) => {
    try {
        return fn();
    } catch (e) {
        return fallbackValue;
    }
};