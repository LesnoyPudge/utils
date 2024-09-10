import { T } from '@lesnoypudge/types-utils-base/namespace';

// @ts-expect-error untyped library
import isCallableLib from 'is-callable';

export const isCallable = (value: unknown): value is T.AnyFunction => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return isCallableLib(value) as boolean;
}