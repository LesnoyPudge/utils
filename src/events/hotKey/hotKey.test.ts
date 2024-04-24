import { hotKey, noop } from "@root"



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
})