import { T } from '@lesnoypudge/types-utils-base/namespace';
import { noop } from '@root/noop';



type Resolve<Result> = (result: Result) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Reject = (reason?: any) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Executor<Result = any> = (res: Resolve<Result>, rej: Reject) => void;

export namespace derivedPromise {
    export type Controls<Result> = {
        resolve: Resolve<Result>;
        reject: Reject;
    };
}

export const derivedPromise = <
    Result = void,
    FN extends Executor = T.AnyFunction<[Resolve<Result>, Reject], void>,
>(executor?: FN): [
    promise: Promise<Result>,
    controls: derivedPromise.Controls<Result>,
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
    });

    const controls: derivedPromise.Controls<Result> = {
        resolve,
        reject,
    };

    return [
        promise,
        controls,
    ];
};