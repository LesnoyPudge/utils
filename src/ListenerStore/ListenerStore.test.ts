import { ListenerStore, Counter } from '@root';



describe('ListenerStore', () => {
    test('1', () => {
        const store = new ListenerStore<string, [number]>();
        const c1 = new Counter();
        const c2 = new Counter();

        store.add('1', c1.inc);
        store.add('2', c2.inc);
        store.add('2', c2.inc);
        store.add('2', (v) => c2.inc(v));

        store.trigger('1', 5);

        store.remove('1', c1.inc);

        store.trigger('1', 10);

        store.trigger('2', 5);

        expect(c1.get()).toBe(5);
        expect(c2.get()).toBe(10);
    });
});