


export const toCamelCase = (s: string) => {
    s = s.toLowerCase()

    if (s.length === 0) return s;
    if (s.length === 1) return s.toUpperCase();

    return s[0].toUpperCase() + s.slice(1);
}