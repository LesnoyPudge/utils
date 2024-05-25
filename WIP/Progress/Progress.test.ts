import { Counter } from "../../src";
import { Progress } from "./Progress";



describe('Progress', () => {
    test('1', () => {
        const c = new Counter();
        const p = new Progress()

        // p.subscribe(() => c.inc())
        c.inc()
        // p.set(5)

        expect(c.get()).toBe(1)
    })
})