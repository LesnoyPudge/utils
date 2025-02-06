import { debounce } from './debounce';



vi.useFakeTimers();

describe('debounce', () => {
    it('should only register last call', () => {
        const DELAY = 100;
        const spy = vi.fn();

        const debounced = debounce(spy, DELAY);

        debounced(5);
        debounced(5);
        debounced(3);

        vi.advanceTimersByTime(DELAY);

        expect(spy).toBeCalledWith(3);
    });
});