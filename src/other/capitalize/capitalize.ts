


export const capitalize = <
    _Value extends string,
>(word: _Value): Capitalize<_Value> => {
    if (!word) return word as Capitalize<_Value>;
    return (word.charAt(0).toUpperCase() + word.slice(1)) as Capitalize<_Value>;
};