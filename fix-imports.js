import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function addExtensions(filePath) {
    const content = readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(
        /(from\s+['"])(\.\/[^'"]+)(['"])/g, 
        (match, p1, p2, p3) => {
            const jsFilePath = resolve(dirname(filePath), `${p2}.js`);
            const indexJsFilePath = resolve(
                dirname(filePath), 
                `${p2}/index.js`
            );

            if (existsSync(jsFilePath)) {
                return `${p1}${p2}.js${p3}`;
            } else if (existsSync(indexJsFilePath)) {
                return `${p1}${p2}/index.js${p3}`;
            }
            return match;
        }
    );
    writeFileSync(filePath, updatedContent, 'utf8');
}

function processDirectory(directory) {
    console.log('fixing path aliases')
    const files = readdirSync(directory);
    files.forEach((file) => {
        const filePath = join(directory, file);
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (filePath.endsWith('.js')) {
            addExtensions(filePath);
        }
    });
}

const buildDir = join(__dirname, 'build');
processDirectory(buildDir);
