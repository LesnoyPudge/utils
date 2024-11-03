import { toPromise } from "@root";



describe('toPromise', () => {
    test('1', async() => {
        const simpleResult = 1;
        const simple = () => simpleResult;
        
        expect(toPromise(simple)()).toBeInstanceOf(Promise);

        expect(await toPromise(simple)()).toBe(simpleResult);
    
        const withError = () => {
            return Promise.reject();
        }
        
        expect(
            await toPromise(withError)().catch(() => 2)
        ).toBe(2)

        const withError2 = () => {
            throw new Error("");
        }

        expect(
            await toPromise(withError2)().catch(() => 2)
        ).toBe(2)
    })
})