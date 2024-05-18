import { ValueOf } from "ts-essentials";



type Tag = keyof HTMLElementTagNameMap;
type TagElement<ProvidedTag extends Tag> = HTMLElementTagNameMap[ProvidedTag];

export const createElement = <ProvidedTag extends Tag>(
    tag: ProvidedTag, 
    options?: Partial<TagElement<ProvidedTag>>,
) => {
    const el = document.createElement(tag);

    if (!options) return el;

    (
        (Object.entries(options) as [
            keyof TagElement<ProvidedTag>, 
            ValueOf<TagElement<ProvidedTag>>
        ][]).forEach(([key, value]) => {
            el[key] = value;
        })
    );

    return el;
};
