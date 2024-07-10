const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('node:path');

module.exports = {
    output: {
        path: join(__dirname, '../../dist/apps/bewoak-api'),
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: 'node',
            compiler: 'swc',
            main: './src/main.ts',
            tsConfig: './tsconfig.app.json',
            assets: ['./src/assets'],
            optimization: process.env.BUN_ENV === 'production',
            outputHashing:
                process.env.BUN_ENV === 'production' ? 'all' : 'none',
        }),
    ],
};
