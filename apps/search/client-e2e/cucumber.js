module.exports = {
    default: {
        paths: ['apps/search/client-e2e/src/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['apps/search/client-e2e/src/**/*.step.ts'],
        format: [
            'json:dist/reports/apps/search/client-e2e/test-feature/index.json',
            'html:dist/reports/apps/search/client-e2e/test-feature/index.html',
        ],
    },
};
