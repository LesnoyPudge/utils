


export const parseJSON = <ExpectedValue = unknown>(
    json: string,
    reviver?: (this: any, key: string, value: any) => any,
): ExpectedValue | undefined => {
    try {
        return JSON.parse(json, reviver) as ExpectedValue;
    } catch (error) {
        return undefined;
    }
};