import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import { replaceTscAliasPaths } from 'tsc-alias';
import { FolderTree } from "./build/index.js";


// const baseConfigFile = fs.readFileSync('./tsconfig.json').toString();
// const buildConfigFile = fs.readFileSync('./tsconfig.build.json').toString();

// const baseConfig = JSON.parse(jsonrepair(baseConfigFile));
// const buildConfig = JSON.parse(jsonrepair(buildConfigFile));

// const files = fs.globSync(buildConfig.include);
// console.log(files.filter((path) => !path.match()));

// const inputTest = fs.readFileSync('./src/index.ts', {
//     encoding: 'utf-8',
// });

// const qwe = ts.transpile(
//     inputTest,
//     config.compilerOptions,
// );


function getConfigAndFiles() {
    const fileName = 'tsconfig.build.json'
    const configFileName = ts.sys.getCurrentDirectory() + `/${fileName}`;
    const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);

    if (configFile.error) {
        throw new Error(`Could not read ${fileName}: ${configFile.error.messageText}`);
    }

    const parsedConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        path.dirname(configFileName)
    );

    return { 
        options: parsedConfig.options, 
        fileNames: parsedConfig.fileNames 
    };
}

function filterFiles(fileNames: string[], exclude: string[] | string): string[] {
    const excludedFiles = new Set<string>();

    // Resolve the exclude patterns
    (Array.isArray(exclude) ? exclude : [exclude]).forEach(pattern => {
        const matches = fs.globSync(pattern, { cwd: process.cwd() });
        matches.forEach(file => excludedFiles.add(path.resolve(file)));
    });

    // Return files that are not in the exclude set
    return fileNames.filter(file => !excludedFiles.has(path.resolve(file)));
}

// const addFileExtensionTransformer = (): ts.TransformerFactory<
//     ts.SourceFile
// > => {
//     return (context) => {
//         return (sourceFile) => {
//             const visitor: ts.Visitor = (node) => {
//                 const isImport = ts.isImportDeclaration(node);
//                 const isExport = ts.isExportDeclaration(node)
//                 const isImportOrExport = isImport || isExport;

//                 const shouldProcess = (
//                     isImportOrExport
//                     && node.moduleSpecifier 
//                     && ts.isStringLiteral(node.moduleSpecifier)
//                     && isUnsolvedRelativePath(node.moduleSpecifier.text)
//                 );

//                 if (!shouldProcess) return ts.visitEachChild(
//                     node, 
//                     visitor, 
//                     context
//                 );

//                 // console.log(
//                 //     sourceFile.fileName,
//                 //     node.moduleSpecifier.text,
//                 //     addJsExtension(
//                 //         sourceFile.fileName,
//                 //         node.moduleSpecifier.text
//                 //     )
//                 // )
                

//                 const newText = addJsExtension(
//                     sourceFile.fileName,
//                     node.moduleSpecifier.text,
//                 );
//                 // console.log(node.moduleSpecifier.text, newText, '\n')
//                 const newModuleSpecifier = ts.factory.createStringLiteral(
//                     newText,
//                     true,
//                 );

//                 if (isImport) return ts.factory.updateImportDeclaration(
//                     node,
//                     node.modifiers,
//                     node.importClause,
//                     newModuleSpecifier,
//                     node.attributes,
//                 );

//                 if (isExport) return ts.factory.updateExportDeclaration(
//                     node,
//                     node.modifiers,
//                     node.isTypeOnly,
//                     node.exportClause,
//                     newModuleSpecifier,
//                     node.attributes,
//                 );

//                 return ts.visitEachChild(node, visitor, context);
//             };

//             return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
//         };
//     };

// }

const isUnsolvedRelativePath = (relativePath: string) => {
    if (!relativePath.startsWith('./')) return false;
    if (relativePath.match(/\.[a-zA-Z0-9]+$/)) return false;
    
    return true;
}

const getJsExtension = (
    sourceFilePath: string,
    relativePath: string
): string => {
    const dirPath = path.dirname(sourceFilePath);
    const jsRelativeFilePath = `${relativePath}.js`;
    const jsFilePath = path.resolve(
        dirPath,
        jsRelativeFilePath
    );
    const indexRelativeFilePath = `${relativePath}/index.js`;
    const indexFilePath = path.resolve(
        dirPath,
        indexRelativeFilePath
    );

    // if (sourceFilePath.endsWith('src/index.js')) {
    //     console.log({
    //         sourceFilePath,
    //         relativePath, 
    //         dirPath,
    //         // jsFilePath, 
    //         indexFilePath,
    //         indexRelativeFilePath
    //     })
    // }

    if (fs.existsSync(jsFilePath)) return jsRelativeFilePath;
    if (fs.existsSync(indexFilePath)) return indexRelativeFilePath;

    return relativePath;
}

const transpileFiles = (
    fileNames: string[], 
    options: ts.CompilerOptions,
) => {
    const program = ts.createProgram(fileNames, options);

    const emitResult = program.emit(
        undefined, 
        undefined, 
        undefined, 
        false,
    );

    if (emitResult.emitSkipped) {
        throw new Error("Failed to emit transpiled files.");
    }

    return emitResult.emittedFiles;
}

const transformFiles = (
    options: ts.CompilerOptions,
) => {
    if (options.baseUrl && options.paths) {     
        replaceTscAliasPaths(options);
    }

    if (options.outDir) {
        // @ts-ignore
        new FolderTree(options.outDir).traverse((fileOrFolder) => {
            if (fileOrFolder.type !== 'file') return;
            
            const file = fileOrFolder;
            if (!file.name.endsWith('.js')) return;

            const content = fs.readFileSync(file.path, 'utf8');
            const updatedContent = content.replace(
                /(from\s+['"])(\.\/[^'"]+)(['"])/g,
                (match, leftQuote, relativePath, rightQuote) => {
                    if (!isUnsolvedRelativePath(relativePath)) return match;
                    
                    const newRelativePath = getJsExtension(
                        file.path,
                        relativePath,
                    )

                    return `${leftQuote}${newRelativePath}${rightQuote}`;
                },
            );

            fs.writeFileSync(file.path, updatedContent, 'utf8');
        })
    }
    
}

(() => {
    const { options, fileNames } = getConfigAndFiles();
    
    const filesToTranspile = filterFiles(
        fileNames, 
        (options.exclude || []) as string[]
    );

    if (options.outDir) {
        fs.rmSync(options.outDir, {force: true, recursive: true});
    }

    transpileFiles(filesToTranspile, options);

    transformFiles(options);
})();