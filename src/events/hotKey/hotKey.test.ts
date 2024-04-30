import { counter, hotKey, noop } from "@root"



describe('hotKey', () => {
    test('1', () => {
        const e1 = new KeyboardEvent('keydown', {key: 'w'})
        const e2 = new KeyboardEvent('keydown', {key: ' '})
        const e3 = new KeyboardEvent('keydown', {ctrlKey: true})
        const e4 = new KeyboardEvent('keydown', {})
    
        expect(hotKey.make(['w'])(noop)(e1)).toBe(true)
        expect(hotKey.make(['a'])(noop)(e1)).toBe(false)
        expect(hotKey.make(['w', 'a'])(noop)(e1)).toBe(false)
        expect(hotKey.make(['control', 'w'])(noop)(e1)).toBe(false)
        expect(hotKey.make(['control', 'alt', 'w'])(noop)(e1)).toBe(false)

        expect(hotKey.make([' '])(noop)(e2)).toBe(true)
        expect(hotKey.make(['control', ' '])(noop)(e2)).toBe(false)
        expect(hotKey.make([' ' + ' '])(noop)(e2)).toBe(false)

        expect(hotKey.make(['control'])(noop)(e3)).toBe(true)
        expect(hotKey.make(['control', 's'])(noop)(e3)).toBe(false)

        expect(hotKey.make([])(noop)(e4)).toBe(true)
    })

    test('2', () => {
        const e1 = new KeyboardEvent('keydown', {key: 'w'})
        const {get, inc} = counter(0)
        
        const res = hotKey.one(
            hotKey.make(['w'])(() => inc()),
            hotKey.make(['w'])(() => inc()),
        )(e1)

        expect(res).toBe(true)
        expect(get()).toBe(1);
    })

    test('3', () => {
        const e1 = new KeyboardEvent('keydown', {key: 'w'})
        const {get, inc} = counter(0)
        
        const res = hotKey.many(
            hotKey.make(['w'])(() => inc()),
            hotKey.make(['w'])(() => inc()),
        )(e1)

        expect(res).toBe(true)
        expect(get()).toBe(2);
    })

    test('4', () => {
        const e1 = new KeyboardEvent('keydown', {key: 's'})
        const {get, inc} = counter(0)
        
        const res = hotKey.many(
            hotKey.make(['w'])(() => inc()),
            hotKey.make(['w'])(() => inc()),
        )(e1)

        expect(res).toBe(false)
        expect(get()).toBe(0);
    })
})