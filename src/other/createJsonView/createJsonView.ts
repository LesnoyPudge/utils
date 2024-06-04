import { T } from "@lesnoypudge/types-utils-base";



type Options<_AsHtml extends boolean> = {
    className?: string;
    space?: number;
    asHTML?: _AsHtml;
    replacer?: ((this: unknown, key: string, value: unknown) => unknown);
};

type Return<_AsHtml extends boolean> = (
    (_AsHtml extends true ? HTMLPreElement : string) 
    | null
);

const xssmap: T.AnyRecord = {
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt',
};

const xss = (s: string): string => {
    if (!s) {
      return s;
    }
  
    return s.replace(/<|>|&|"|'/g, (m) => {
      return xssmap[m];
    });
}

const replace = (
    match: any, 
    ind: string, 
    key: string, 
    val: string, 
    tra: string,
) => {
    const spanEnd = '</span>';
    const keySpan = `<span class="__json-key__">`;
    const valSpan = `<span class="__json-value__">`;
    const strSpan = `<span class="__json-string__">`;
    const booSpan = `<span class="__json-boolean__">`;

    let sps = ind || '';
    if (key) {
      sps = sps + '"' + keySpan + key.replace(/^"|":\s$/g, '') + spanEnd + '": ';
    }

    if (val) {
      if (val === 'true' || val === 'false') {
        sps = sps +  booSpan + val + spanEnd;
      } else {
        sps = sps + (val[0] === '"' ? strSpan : valSpan) + val + spanEnd;
      }
    }

    return sps + (tra || '');
}

const pretty = (
    data: unknown, 
    options: Pick<Options<boolean>, 'replacer' | 'space'>,
): string => {
    // “key”: "value" | "key": value | "key": [ | "key": { | "key": [],| "Key": {},
    const regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
    const text = JSON.stringify(
        data,
        options.replacer,
        options.space
    );
    
    if (!text) return text;

    return (
        text.replace(/&/g, '&amp;')
            .replace(/\\"([^,])/g, '\\&quot;$1')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(regLine, replace)
    );
}

const defaultOptions = {
    className: '',
    asHTML: false,
    space: 4,
} satisfies Options<boolean>;

export const createJsonView = <_AsHtml extends boolean = false>(
    data: string | T.AnyRecord,
    options: Options<_AsHtml> = {},
): Return<_AsHtml> => {
    const {
        className,
        asHTML,
        ..._options
    } = { ...defaultOptions, ...options };

    try {
        const obj = typeof data === 'string' ? JSON.parse(data) : data; 
        const view = xss(pretty(obj, _options));

        if (asHTML) {
            const el = document.createElement('pre')
            el.className = className;
            el.innerHTML = view;
            
            return el as Return<_AsHtml>;
        }

        return (
            `<pre class="${className}">
                ${view}
            </pre>`
        ) as Return<_AsHtml>;
    } catch (error) {
        return null;
    } 
}