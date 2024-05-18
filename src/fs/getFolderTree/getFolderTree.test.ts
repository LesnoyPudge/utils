import { getFolderTree } from "@root";



describe('getFolderTree', () => {
    test('1', () => {
        expect(getFolderTree('./getFolderTree.ts')).toBe(null)
    })

    test('2', () => {
        const tree = getFolderTree('.');
        const result = !!(tree?.files.length || tree?.folders.length);
        
        expect(result).toBe(true);
    })
})