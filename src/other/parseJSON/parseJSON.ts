


export const parseJSON = <ExpectedValue = unknown>(
    json: string,
    reviver?: Parameters<typeof JSON.parse>[1],
): ExpectedValue | undefined => {
    try {
        return JSON.parse(json, reviver) as ExpectedValue;
    } catch (error) {
        return undefined;
    }
};