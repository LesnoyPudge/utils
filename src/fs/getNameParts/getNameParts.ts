


type Parts = {
    name: string;
    ext: string;
};

export const getNameParts = (fileName: string): Parts | null => {
    const splittedName = fileName.split('.');
    if (splittedName.length < 2) return null;

    const ext = splittedName.pop();
    if (!ext) return null;

    const name = splittedName.join('.');

    return {
        name,
        ext,
    };
};