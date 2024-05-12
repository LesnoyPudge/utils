import { DerivedPromiseControls, autoBind, derivedPromise, noop } from "@root";
import { AnyFunction } from "ts-essentials";



type QueueItem<Args extends unknown[], Return> = (
    DerivedPromiseControls<Return> & {
        promise: Promise<Return>;
        args: Args;
    }
);

export class InlineWorker<Arg extends unknown[] = void[], Return = void> {
    private worker: Worker | null;
    private queue: QueueItem<Arg, Return>[];
    private fn: AnyFunction<Arg, Return>;
    private onSuccess: AnyFunction<[Return]>;
    private onError: AnyFunction<[ErrorEvent]>;

    constructor(
        fn: AnyFunction<Arg, Return>,
        onSuccess: AnyFunction<[Return]> = noop,
        onError: AnyFunction<[ErrorEvent]> = noop,
    ) {
        this.worker = null;
        this.queue = [];
        this.fn = fn;
        this.onSuccess = onSuccess;
        this.onError = onError;

        autoBind(this);
    }

    private createWorker(fn: AnyFunction<Arg, Return>) {
        const workerCode = (`
            const workerFunction = (${fn});
        
            onmessage = (event) => {
                const args = event.data;
                const result = workerFunction(...args);
                postMessage(result);
            };
        `);
        const workerBlob = new Blob([workerCode], {
            type: 'application/javascript',
        });
        const worker = new Worker(URL.createObjectURL(workerBlob));

        worker.onerror = (event) => {
            this.queue[0].reject(event);
            this.onError(event);
        };

        worker.onmessage = (event) => {
            this.queue[0].resolve(event.data);
            this.onSuccess(event.data);
        };

        return worker;
    }

    start(...args: Arg): Promise<Return> {
        if (!this.worker) {
            this.worker = this.createWorker(this.fn);
        }

        const [promise, controls] = derivedPromise<Return>();

        promise.finally(() => {
            this.queue.shift();
            
            if (this.queue.length) {
                this.worker?.postMessage(this.queue[0].args);
            }
        })

        this.queue.push({
            promise,
            args,
            ...controls,
        });

        if (this.queue.length <= 1) {
            this.worker.postMessage(this.queue[0].args)
        }

        return promise;
    }

    cancel() {
        this.queue[0].reject();
    }

    terminate() {
        this.worker?.terminate();
        this.worker = null;
        const items = [...this.queue];
        this.queue = [];
        
        items.forEach((item) => item.reject());
    }
}