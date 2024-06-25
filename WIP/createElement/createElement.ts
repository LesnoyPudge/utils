import { T } from '@lesnoypudge/types-utils-base';



type Tag = keyof HTMLElementTagNameMap;

type TagElement<ProvidedTag extends Tag> = HTMLElementTagNameMap[ProvidedTag];

type Child = Node | string;

type Override<
    Source extends T.AnyRecord,
    Key extends keyof Source,
    NewValue,
> = {
    [K in keyof Source]: K extends Key ? NewValue : Source[K];
};

type ElementWithExtendedChildren<ProvidedTag extends Tag> = T.Writable<
    Override<
        HTMLElementTagNameMap[ProvidedTag],
        'children',
        Child[] | HTMLElementTagNameMap[ProvidedTag]['children']
    >
>;

type qwe = Override<{ wow: 5; some: 'yea' }, 'wow', string>;

const isChildrenList = (value: unknown): value is Child[] => {
    return Array.isArray(value);
};

type Options<ProvidedTag extends Tag> = Partial<
    T.DeepOmit<
        ElementWithExtendedChildren<ProvidedTag>,
        Record<string, string | null | undefined>
    >
>;

// export const createElement = () => {}

type Options2<_ProvidedTag extends Tag> = Partial<{
    [_Key in keyof HTMLElementTagNameMap[_ProvidedTag]]: (
        HTMLElementTagNameMap[_ProvidedTag][_Key] extends string
            ? HTMLElementTagNameMap[_ProvidedTag][_Key]
            : never
    )
}> & Record<`data-${string}`, string>;

export const createElement = <ProvidedTag extends Tag>(
    tag: ProvidedTag,
    options?: Options2<ProvidedTag>,
    children?: HTMLElement[],
): HTMLElementTagNameMap[ProvidedTag] => {
    const el = document.createElement(tag);

    if (options) {
        (Object.entries(options) as [
            keyof TagElement<ProvidedTag>,
            T.ValueOf<HTMLElementTagNameMap[ProvidedTag]>,
        ][]).forEach(([key, value]) => {
            el.setAttribute(String(key), String(value));
        });
    }

    if (children?.length) {
        children.forEach((child) => {
            el.appendChild(child);
        });
    }

    return el;
};