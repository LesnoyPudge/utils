import { getNameParts } from '@root';



type Parts = NonNullable<ReturnType<typeof getNameParts>>;

describe('getNameParts', () => {
    test('1', () => {
        expect(getNameParts('someFile.txt')).toStrictEqual({
            name: 'someFile',
            ext: 'txt',
        } satisfies Parts);

        expect(getNameParts('someFile.txt.js.ts')).toStrictEqual({
            name: 'someFile.txt.js',
            ext: 'ts',
        } satisfies Parts);

        expect(getNameParts('someFile.')).toBe(null);

        expect(getNameParts('.someFile')).toStrictEqual({
            name: '',
            ext: 'someFile',
        } satisfies Parts);

        expect(getNameParts('.')).toBe(null);

        expect(getNameParts('')).toBe(null);
    });
});