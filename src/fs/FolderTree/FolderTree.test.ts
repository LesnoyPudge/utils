import { FolderTree } from "@root";



describe('FolderTree', () => {
    test('1', () => {
        const tree = new FolderTree('./non-existing-folder');
        
        expect(tree.data).toBe(null)
        expect(tree.isEmpty()).toBe(true)
    })

    test('2', () => {
        const tree = new FolderTree('.');
        
        expect(tree.isEmpty()).toBe(false);
    })
})