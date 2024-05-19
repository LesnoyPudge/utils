import { DeepOmit, ValueOf, Writable } from "ts-essentials";
import { AnyRecord } from "ts-essentials/dist/any-record";



type Tag = keyof HTMLElementTagNameMap;

type TagElement<ProvidedTag extends Tag> = HTMLElementTagNameMap[ProvidedTag];

type Child = Node | string;

type Override<
    Source extends AnyRecord, 
    Key extends keyof Source,
    NewValue,
> = {
    [K in keyof Source]: K extends Key ? NewValue : Source[K];
};

type ElementWithExtendedChildren<ProvidedTag extends Tag> = Writable<
    Override<
        HTMLElementTagNameMap[ProvidedTag],
        'children',
        Child[] | HTMLElementTagNameMap[ProvidedTag]['children']
    >
>;

type qwe = Override<{wow: 5, some: 'yea'}, 'wow', string>;

const isChildrenList = (value: unknown): value is Child[] => {
    return Array.isArray(value)
}

type Options<ProvidedTag extends Tag> = Partial<
    DeepOmit<
        ElementWithExtendedChildren<ProvidedTag>, 
        Record<string, string | null | undefined>
    >
>;

export const createElement = () => {}

// export const createElement = <ProvidedTag extends Tag>(
//     tag: ProvidedTag, 
//     options?: Options<ProvidedTag>,
// ): ElementWithExtendedChildren<ProvidedTag> => {
//     const el = document.createElement(tag) as ElementWithExtendedChildren<
//         ProvidedTag
//     >;

//     if (!options) return el;

//     (
//         (Object.entries(options) as [
//             keyof TagElement<ProvidedTag>, 
//             ValueOf<ElementWithExtendedChildren<ProvidedTag>>
//         ][]).forEach(([key, value]) => {
//             if (key === 'children' && isChildrenList(value)) {
//                 el.append(...value);
//                 return;
//             }

//             (el as TagElement<ProvidedTag>)[
//                 key
//             ] = value as ValueOf<TagElement<ProvidedTag>>;
//         })
//     );

//     return el;
// };
