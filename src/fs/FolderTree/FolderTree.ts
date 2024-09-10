import { autoBind } from '@root';
import fs from 'node:fs';
import path from 'node:path';



type File = {
    type: 'file';
    name: string;
    data: Buffer;
    path: string;
};

type Folder = {
    type: 'folder';
    name: string;
    files: File[];
    folders: Folder[];
    path: string;
};

export class FolderTree {
    data: Folder | null;

    constructor(providedPath: string, extensions?: string[]) {
        this.data = this.createFolderTree(providedPath, extensions);
        autoBind(this);
    }

    private createFolderTree(providedPath: string, extensions?: string[]) {
        try {
            const resolvedPath = path.resolve(
                import.meta.dirname, 
                providedPath
            )
            const currentStats = fs.statSync(resolvedPath);
            const tree = this.createEmptyFolder('', resolvedPath);

            if (currentStats.isDirectory()) {
                tree.name = path.basename(resolvedPath);
            }

            this.fillFolder(resolvedPath, tree, extensions);

            return tree;
        } catch (error) {
            return null;
        }
    }

    private createEmptyFolder(name: string, path: string): Folder {
        return {
            type: 'folder',
            files: [],
            folders: [],
            name,
            path,
        };
    }

    private fillFolder(
        currentPath: string,
        folder: Folder,
        extensions: string[] | undefined,
    ) {
        const files = fs.readdirSync(currentPath);

        files.forEach((fileName) => {
            const filePath = path.join(currentPath, fileName);
            const stat = fs.statSync(filePath);

            const validExtension = (
                extensions
                    ? extensions.some((ext) => fileName.endsWith(ext))
                    : true
            );

            if (stat.isFile() && validExtension) {
                const fileData = fs.readFileSync(filePath);
                folder.files.push({ 
                    data: fileData, 
                    name: fileName,
                    type: 'file',
                    path: filePath,
                });
            }

            if (stat.isDirectory()) {
                const newFolder = this.createEmptyFolder(fileName, filePath);
                folder.folders.push(newFolder);
                this.fillFolder(filePath, newFolder, extensions);
            }
        });
    }

    private traverseFolder(
        folder: Folder,
        cb: (value: Folder | File) => void,
    ) {
        cb(folder);
        folder.files.forEach(cb);
        folder.folders.forEach((_folder) => {
            this.traverseFolder(_folder, cb);
        });
    }

    traverse(cb: (value: Folder | File) => void) {
        if (!this.data) return;
        this.traverseFolder(this.data, cb);
    }

    isEmpty() {
        return !(this.data?.files.length ?? this.data?.folders.length);
    }

    getDataWithoutBuffer(): Folder | null {
        if (!this.data) return this.data;
        
        const folder = structuredClone(this.data);
        
        this.traverseFolder(folder, (fileOrFolder) => {
            if (fileOrFolder.type !== 'file') return;

            fileOrFolder.data = Buffer.from('');
        })

        return folder;
    }
}