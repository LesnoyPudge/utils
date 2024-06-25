import { derivedPromise, sleep } from '@root';



describe('derivedPromise', () => {
    test('1', async () => {
        const [promise, { resolve }] = derivedPromise<string>((res) => {
            sleep(100).then(() => res('2'));
        });

        let result = '';

        promise.then((v) => {
            result = v;
        });

        resolve('1');

        await sleep();

        expect(result).toBe('1');
    });

    test('2', async () => {
        const [promise] = derivedPromise<string>((res) => {
            res('1');
        });

        let result = '';

        promise.then((v) => {
            result = v;
        });

        await sleep();

        expect(result).toBe('1');
    });

    test('3', async () => {
        const [promise, { reject }] = derivedPromise<string>((res) => {
            sleep().then(() => res('1'));
        });

        let result = '';

        promise.then((v) => {
            result = v;
        }).catch(() => {
            result = '2';
        });

        reject();

        await sleep();

        expect(result).toBe('2');
    });
});