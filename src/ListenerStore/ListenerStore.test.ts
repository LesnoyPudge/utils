import { ListenerStore } from './ListenerStore';



describe('ListenerStore', () => {
    it('should subscribe, unsubscribe and trigger listeners', () => {
        const store = new ListenerStore<string, [number]>();
        const firstSpy = vi.fn();
        const secondSpy = vi.fn();

        store.add('1', firstSpy);
        store.add('2', secondSpy);
        store.add('2', secondSpy);
        store.add('2', (v) => {
            secondSpy(v);
        });

        store.trigger('1', 2);

        store.remove('1', firstSpy);

        store.trigger('1', 10);

        store.trigger('2', 5);

        expect(firstSpy).toBeCalledTimes(1);
        expect(firstSpy).toBeCalledWith(2);

        expect(secondSpy).toBeCalledTimes(2);
        expect(secondSpy).toBeCalledWith(5);
    });
});