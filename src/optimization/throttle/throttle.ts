import { AnyFunction } from "ts-essentials";
import { noop } from "@root";



type Controls = {
    block: () => void;
    reset: () => void;
}

export const throttle = <FN extends AnyFunction<any[], void>>(
    fn: FN, 
    delayMS: number
): [
    wrappedFunc: (...args: Parameters<FN>) => Promise<void>,
    control: Controls,
] => {
    let lastArgs: any[];
    let isBlocked = false;
    let isCalledDuringBlock = false;
    let timeoutId: any;

    const block = (resolve = noop) => {
        isBlocked = true;

        timeoutId = setTimeout(() => {
            isBlocked = false;
            resolve();

            if (isCalledDuringBlock) {
                fn(...lastArgs)
                block()
            }
        }, delayMS)
    }

    const reset = () => {
        clearTimeout(timeoutId)
        isBlocked = false;
        isCalledDuringBlock = false;
    }

    const wrappedFunc = (...args: Parameters<FN>) => {
        return new Promise<void>((resolve) => {
            if (!isBlocked) {
                fn(...args);
    
                block(resolve);
                return;
            }
    
            isCalledDuringBlock = true;
            lastArgs = args;
        })
    }

    const controls: Controls = {
        block,
        reset,
    }

    return [
        wrappedFunc,
        controls
    ]
}