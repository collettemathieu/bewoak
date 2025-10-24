const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('node:path');

module.exports = {
    output: {
        path: join(__dirname, '../../../dist/apps/apps-pathway-design-server'),
    },
    plugins: [
        new NxAppWebpackPlugin({
            assets: ['./src/assets'],
            compiler: 'tsc',
            main: './src/main.ts',
            optimization: process.env.BUN_ENV === 'production',
            outputHashing: process.env.BUN_ENV === 'production' ? 'all' : 'none',
            sourceMap: true,
            target: 'node',
            transformers: [{ name: '@nestjs/swagger/plugin' }],
            tsConfig: './tsconfig.app.json',
        }),
    ],
};
