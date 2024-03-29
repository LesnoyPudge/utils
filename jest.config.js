import tsconfig from "./tsconfig.json" assert { type: "json" };
import { pathsToModuleNameMapper } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
    modulePaths: [
        '<rootDir>'
    ],
};