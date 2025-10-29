module.exports = {
    default: {
        format: [
            'json:dist/reports/lib/search/server/test-feature/index.json',
            'html:dist/reports/lib/search/server/test-feature/index.html',
        ],
        paths: ['lib/search/server/src/lib/**/*.feature'],
        require: ['lib/search/server/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
