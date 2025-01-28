import { promiseToBoolean } from './promiseToBoolean';



describe('promiseToBoolean', () => {
    test('1', async () => {
        expect(
            await promiseToBoolean(Promise.resolve()),
        ).toBe(true);

        expect(
            await promiseToBoolean(Promise.reject()),
        ).toBe(false);
    });
});