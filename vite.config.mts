import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteFontsPlugin from './vite.plugin.fonts';

import generateGlobals from './app.config';
import devConfig from './vite.dev.config';
import prodConfig from './vite.prod.config';

import { colorModes, defaultColorMode } from './src/styles/themes';

export default defineConfig(({ command }) => {
    const isProd = command === 'build';
    const isVitestUICommand = process.argv.includes('--ui');

    const globals = generateGlobals(isProd);
    console.log(globals);

    return {
        ...(isProd ? prodConfig() : devConfig()),
        base: globals.baseUrl,
        define: {
            __globals__: globals,
            'process.env.IS_VITEST_UI': JSON.stringify(isVitestUICommand),
        },
        plugins: [
            viteFontsPlugin(),
            !isVitestUICommand &&
                createHtmlPlugin({
                    inject: {
                        data: {
                            title: globals.title,
                            injectStyle: `
                            <style>
                                html {
                                    background-color: ${colorModes[defaultColorMode].primaryColor} !important;
                                }
                            </style>`,
                        },
                    },
                }),
            react({
                babel: {
                    configFile: './babel.config.js',
                },
            }),
            checker({
                typescript: true,
                overlay: {
                    panelStyle: `height: 100%; max-height: 100%;`,
                },
            }),
        ].filter(Boolean),
        optimizeDeps: {
            include: ['react', 'react-dom', 'framer-motion', 'styled-components'],
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
});
