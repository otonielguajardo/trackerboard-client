import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [vue(), eslintPlugin()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, './src'),
            },
        ],
    },
});
