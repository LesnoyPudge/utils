


/**
 * Returns boolean indicating resolution of provided promise.
 */
export const promiseToBoolean = async (value: Promise<unknown>) => {
    return await value.then(() => true).catch(() => false);
};