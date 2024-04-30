import { defaults } from "@root";



type Action = (e: KeyboardEvent) => void;

type Handler = (e: KeyboardEvent) => boolean;

type HotKeyOptions = {
    prevent?: boolean;
    stop?: boolean;
    stopImmediate?: boolean;
}

type HotKey = (action: Action, options?: HotKeyOptions) => Handler;

type KeyCombos = string[][];

type Make = (...keys: KeyCombos) => HotKey;

type EventLike = KeyboardEvent & {
    nativeEvent?: KeyboardEvent;
}

const defaultOptions: Required<HotKeyOptions>  = {
    prevent: true,
    stop: false,
    stopImmediate: false,
}

const matchKeyCombos = (e: KeyboardEvent, keyCombos: KeyCombos) => {
    let isMatch = false;

    const activeKeys = Array.from(new Set([
        e.altKey && 'alt', 
        e.ctrlKey && 'control', 
        e.shiftKey && 'shift',
        e.metaKey && 'meta', 
        e.key.toLowerCase(),
    ].filter(Boolean)));

    keyCombos.forEach((keyCombo) => {
        if (isMatch) return;
        if (activeKeys.length !== keyCombo.length) return;
    
        let matchCount = 0;
        let bail = false;

        keyCombo.forEach((key) => {
            if (isMatch) return;
            if (bail) return;

            if (activeKeys.includes(key.toLowerCase())) {
                return matchCount++;
            }

            bail = true;
        })

        isMatch = matchCount === keyCombo.length;
    })

    return isMatch;
}

const make: Make = (...keyCombos) => {
    return (action, options = defaultOptions) => {
        options = defaults(options, defaultOptions)
        
        return (e) => {
            const isMatch = matchKeyCombos(e, keyCombos);
            if (!isMatch) return false;
 
            options.prevent && e.preventDefault()
            options.stop && e.stopPropagation();
            options.stopImmediate && e.stopImmediatePropagation()

            try {
                action(e)
            } catch (error) {
                console.error(error);
                return false;
            }

            return true;
        }
    }
}

const uniter = (maxCalls: number) => {
    return (...handlers: Handler[]) => {
        return (e: EventLike): boolean => {
            let count = 0;
            let bail = count >= maxCalls;
            const event = e.nativeEvent ?? e;
        
            handlers.forEach((handler) => {
                if (bail) return;

                const isHandled = handler(event)
                if (isHandled) count++;

                bail = count >= maxCalls;
            });

            return !!count;
        }
    }
}

export const hotKey = {
    make,
    many: uniter(Infinity),
    one: uniter(1),
}