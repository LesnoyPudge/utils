


/**
 * Returns function that triggers every provided callback when called.
 */
export const combinedFunction = (...callbacks: (() => void)[]) => {
    return () => {
        callbacks.forEach((callback) => {
            callback();
        });
    };
};