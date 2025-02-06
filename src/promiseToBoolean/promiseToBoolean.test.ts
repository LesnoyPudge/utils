import { promiseToBoolean } from './promiseToBoolean';



describe('promiseToBoolean', () => {
    it('should return result of promise as boolean', async () => {
        expect(
            await promiseToBoolean(Promise.resolve()),
        ).toBe(true);

        expect(
            await promiseToBoolean(Promise.reject()),
        ).toBe(false);
    });
});