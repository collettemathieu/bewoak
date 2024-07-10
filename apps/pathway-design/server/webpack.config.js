const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('node:path');

module.exports = {
    output: {
        path: join(__dirname, '../../../dist/apps/pathway-design-server'),
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: 'node',
            compiler: 'tsc',
            main: './src/main.ts',
            tsConfig: './tsconfig.app.json',
            assets: ['./src/assets'],
            optimization: process.env.BUN_ENV === 'production',
            outputHashing:
                process.env.BUN_ENV === 'production' ? 'all' : 'none',
            transformers: [{ name: '@nestjs/swagger/plugin' }],
        }),
    ],
};
