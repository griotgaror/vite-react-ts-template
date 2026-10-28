import { UserConfig } from 'vite';

export default function devConfig(): UserConfig {
    const testApiUrl = 'http://0.0.0.0:3232';
    const hostUrl = '0.0.0.0';

    return {
        server: {
            port: 5050,
            host: hostUrl,
            open: false,
            hmr: {
                overlay: false,
            },
            proxy: {
                '/api': {
                    target: testApiUrl,
                    ws: true,
                    changeOrigin: true,
                },
            },
        },
        preview: {
            host: hostUrl,
        },
        build: {
            outDir: 'build',
            assetsDir: 'static',
            sourcemap: false,
        },
    };
}
