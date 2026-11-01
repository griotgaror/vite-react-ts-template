/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default defineConfig((configEnv) =>
    mergeConfig(
        viteConfig(configEnv),
        defineConfig({
            test: {
                environment: 'jsdom',
                globals: true,
                setupFiles: './src/__tests__/setupTest.tsx',
                passWithNoTests: true,
                exclude: ['**/node_modules/**', '**/build/**'],
            },
        }),
    ),
);
