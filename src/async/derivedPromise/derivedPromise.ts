import { noop } from "@root";
import { AnyFunction } from "ts-essentials";



type Resolve<Result> = (result: Result) => void;
type Reject = (reason?: any) => void;

type Executor<Result = any> = (res: Resolve<Result>, rej: Reject) => void;

type Controls<Result> = {
    resolve: Resolve<Result>;
    reject: Reject,
}

export const derivedPromise = <
    Result = unknown, 
    FN extends Executor = AnyFunction
>(executor?: FN): [
    promise: Promise<Result>,
    controls: Controls<Result>
] => {
    let resolve: Resolve<Result> = noop;
    let reject: Reject = noop;

    const promise = new Promise<Result>((res, rej) => {
        resolve = res;
        reject = rej;

        (executor ?? noop)(res, rej);
    }).finally(() => {
        resolve = noop;
        reject = noop;
    })

    const controls: Controls<Result> = {
        resolve,
        reject,
    }

    return [
        promise,
        controls
    ]
}