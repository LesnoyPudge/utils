import { createCache } from "@root"



// also tested in "memoize"

describe('cache', () => {
    test('base', () => {
        const cache = createCache();

        cache.set([''], 1);
        cache.set([''], 2);
        cache.set([[]], 3);
        cache.set(['', 1], 4);
        cache.set(['', ''], 5);
        cache.set([() => {}], 6);

        const obj = {};
        
        cache.set(['', {}], 7);
        cache.set(['', obj], 8);
        cache.set(['', obj], 9);
        cache.set([{}], 10);
        cache.set([obj], 11);
        cache.set([null], 12);
        cache.set([undefined], 13);
        cache.set([], 14);
        cache.set([], 15);

        expect(cache.getSize()).toBe(12);
    })
})