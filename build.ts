import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import { jsonrepair } from 'jsonrepair';
import tsConfigPaths from "tsconfig-paths";
import { replaceTscAliasPaths, prepareSingleFileReplaceTscAliasPaths } from 'tsc-alias';



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

function addFileExtensionTransformer(): ts.TransformerFactory<ts.SourceFile> {
    return (context) => {
        return (sourceFile) => {
            const visitor: ts.Visitor = (node) => {
                // Process ImportDeclaration
                if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
                    const originalText = node.moduleSpecifier.text;
                    const newText = addJsExtension(originalText);
                    const newModuleSpecifier = ts.factory.createStringLiteral(newText);
                    return ts.factory.updateImportDeclaration(
                        node,
                        // node.decorators,
                        node.modifiers,
                        node.importClause,
                        newModuleSpecifier,
                        node.attributes,
                    );
                }

                // Process ExportDeclaration
                if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
                    const originalText = node.moduleSpecifier.text;
                    const newText = addJsExtension(originalText);
                    const newModuleSpecifier = ts.factory.createStringLiteral(newText);
                    return ts.factory.updateExportDeclaration(
                        node,
                        // node.decorators,
                        node.modifiers,
                        node.isTypeOnly,
                        node.exportClause,
                        newModuleSpecifier,
                        node.attributes,
                    );
                }

                return ts.visitEachChild(node, visitor, context);
            };

            return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
        };
    };
}

// Helper function to add `.js` extension
function addJsExtension(path: string): string {
    if (
        !path.endsWith('.js') 
        && !path.match(/\.[a-z0-9]+$/)
        && path.startsWith('./')
    ) {
        console.log('path to change:', path, '\n')
        return `${path}.js`;
    }
    
    return path;
}

function transpileFiles(fileNames: string[], options: ts.CompilerOptions): void {
    const program = ts.createProgram(fileNames, options);

    // Emit the transpiled code
    const emitResult = program.emit(
        undefined, 
        undefined, 
        undefined, 
        false,
        {
            before: [
                addFileExtensionTransformer()
            ]
        }
    ); // Skip type checking

    // Check whether the emission is skipped
    if (emitResult.emitSkipped) {
        console.error(`Failed to emit transpiled files.`);
    }

    // console.log(options.baseUrl, options.paths)
    if (options.baseUrl && options.paths) {     
        replaceTscAliasPaths(options);
    }


}

function main() {
    const { options, fileNames } = getConfigAndFiles();
    
    const filesToTranspile = filterFiles(
        fileNames, 
        (options.exclude || []) as string[]
    );

    if (options.outDir) {
        fs.rmSync(options.outDir, {force: true, recursive: true});
    }

    transpileFiles(filesToTranspile, options);
}

main();



const main2 = () => {
    const { options, fileNames } = getConfigAndFiles();
    
    const filesToTranspile = filterFiles(
        fileNames, 
        (options.exclude || []) as string[]
    );

    if (options.outDir) {
        fs.rmSync(options.outDir, {force: true, recursive: true});
    }

    console.log(filesToTranspile)
}

// main2()