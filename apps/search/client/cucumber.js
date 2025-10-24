module.exports = {
    default: {
        format: [
            'json:dist/reports/apps/search/client/test-e2e/index.json',
            'html:dist/reports/apps/search/client/test-e2e/index.html',
        ],
        paths: ['apps/search/client/src/specs/**/*.feature'],
        require: ['apps/search/client/src/specs/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
