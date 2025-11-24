module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/search/server/test-feature/index.json',
            'html:dist/reports/libs/search/server/test-feature/index.html',
        ],
        paths: ['libs/search/server/src/lib/**/*.feature'],
        require: ['libs/search/server/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
