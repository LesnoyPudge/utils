import { parseJSON } from "@root"



describe('parseJSON', () => {
    test('1', () => {
        const obj = {a: 1, b: '2'}
        const validJSON = JSON.stringify(obj);
        const invalidJSON = '{"a": 1, b: "2"}'

        const res1 = parseJSON(validJSON);
        const res2 = parseJSON(invalidJSON);

        expect(res1).toStrictEqual(obj);
        expect(res2).toBeUndefined();
    })

    test('2', () => {
        expect(parseJSON('')).toBeUndefined();
    })
})