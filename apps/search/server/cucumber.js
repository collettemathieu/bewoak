module.exports = {
    default: {
        paths: ['apps/search/server/src/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['apps/search/server/src/**/*.step.ts'],
        format: [
            'json:dist/reports/apps/search/server/test-feature/index.json',
            'html:dist/reports/apps/search/server/test-feature/index.html',
        ],
    },
};
