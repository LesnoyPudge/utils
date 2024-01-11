


export const sleep = (durationMS = 0) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, durationMS);
    })
}