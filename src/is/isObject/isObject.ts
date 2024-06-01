import { T } from "@lesnoypudge/types-utils-base";



export const isObject = (v: unknown): v is T.AnyRecord<unknown> => {
    return typeof v === 'object' && v !== null;
}