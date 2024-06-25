import { Counter, FolderTree } from '@root';



describe('FolderTree', () => {
    test('1', () => {
        const tree = new FolderTree('./non-existing-folder');

        expect(tree.data).toBe(null);
        expect(tree.isEmpty()).toBe(true);
    });

    test('2', () => {
        const tree = new FolderTree('.');
        const c = new Counter();

        expect(tree.isEmpty()).toBe(false);

        tree.traverse(() => c.inc());

        expect(c.get()).toBeGreaterThan(0);
    });
});