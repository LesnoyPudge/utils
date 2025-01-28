import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';



const config = mergeConfig(viteConfig, defineConfig({
    test: {
        include: ['./src/**/*.test.*'],
        globals: true,
        mockReset: true,
        environment: 'node',
    },
}));

export default config;