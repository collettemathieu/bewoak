module.exports = {
    default: {
        format: [
            'json:dist/reports/apps/search/server/test-feature/index.json',
            'html:dist/reports/apps/search/server/test-feature/index.html',
        ],
        paths: ['apps/search/server/src/**/*.feature'],
        require: ['apps/search/server/src/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
