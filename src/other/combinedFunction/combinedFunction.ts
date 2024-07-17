


export const combinedFunction = (...callbacks: (() => void)[]) => {
    return () => {
        callbacks.forEach((callback) => {
            callback();
        });
    };
};