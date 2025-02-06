// import { T } from '@lesnoypudge/types-utils-base/namespace';
// import { Cache } from '@root/Cache';



// /**
//  * Returns memoized version of provided function.
//  */
// export const memoize = <FN extends T.AnyFunction>(
//     fn: FN,
//     lifespan = Infinity,
// ) => {
//     const cache = new Cache<ReturnType<FN>>();

//     return (...args: Parameters<FN>): ReturnType<FN> => {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//         return cache.getOrSet(args, () => fn(...args), lifespan);
//     };
// };