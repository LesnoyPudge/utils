import _deepEqual from 'react-fast-compare';



/**
 * General-purpose deep comparison.
 * Also usable in React.memo.
 */
export const deepEqual: (a: unknown, b: unknown) => boolean = _deepEqual;