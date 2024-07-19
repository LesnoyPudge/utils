


export const strFormat = (...values: string[]): string => {
    return values.map((v) => v.trim()).join(' ');
};