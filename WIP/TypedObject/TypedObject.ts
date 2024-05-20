import { AnyRecord } from "ts-essentials/dist/any-record";



type TypedObject = {
    keys,
    entries,
    values,
};

export namespace Types {
    export type ObjectOverride<
        Source extends AnyRecord, 
        Key extends keyof Source,
        NewValue,
    > = {
        [K in keyof Source]: K extends Key ? NewValue : Source[K];
    };
}

export const TypedObject = Object as TypedObject;