import { defineBuildConfig } from "unbuild";



export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    // default
    "./src/index",
    // "./src/namespace",
    // mkdist builder transpiles file-to-file keeping original sources structure
    {
        builder: "mkdist",
        input: "./src", 
        // outDir: "./build",
    },
  ],

  // Change outDir, default is 'dist'
  outDir: "build",
  alias: {},
  // Generates .d.ts declaration file
  declaration: true,
  sourcemap: true
});