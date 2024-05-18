import fs from 'node:fs';
import path from 'node:path';



type File = {
    name: string;
    data: Buffer;
}

type Folder<FileName = string> = {
    name: FileName;
    files: File[];
    folders: Folder[];
}


const fillFolder = (
    currentPath: string,
    folder: Folder,
    extensions: string[] | undefined,
) => {
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
            folder.files.push({ data: fileData, name: fileName });
        }

        if (stat.isDirectory()) {
            const newFolder: Folder = { 
                name: fileName, 
                files: [], 
                folders: [] 
            };
            folder.folders.push(newFolder);
            fillFolder(filePath, newFolder, extensions);
        }
    });
};

export const getFolderTree = (
    providedPath: string, 
    extensions?: string[]
): Folder | null => {
    try {
        const resolvedPath = path.resolve(providedPath);
        const currentStats = fs.statSync(resolvedPath);
        const tree: Folder = { 
            files: [], 
            folders: [],
            name: '',
        };
        
        if (currentStats.isDirectory()) {
            tree.name = path.basename(resolvedPath)
        }

        fillFolder(resolvedPath, tree, extensions);
    
        const isFilled = tree.files.length || tree.folders.length;
        const result = isFilled ? tree : null;
    
        return result;
    } catch (error) {
        return null;
    }
}