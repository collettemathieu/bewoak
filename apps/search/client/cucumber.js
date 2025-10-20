module.exports = {
    default: {
        paths: ['apps/search/client/src/specs/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['apps/search/client/src/specs/**/*.step.ts'],
        format: [
            'json:dist/reports/apps/search/client/test-e2e/index.json',
            'html:dist/reports/apps/search/client/test-e2e/index.html',
        ],
    },
};
