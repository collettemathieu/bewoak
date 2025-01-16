module.exports = {
    default: {
        paths: ['libs/search/server/pathway/application/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/search/server/pathway/application/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/search/server/pathway/application/test-feature/index.json',
            'html:dist/reports/libs/search/server/pathway/application/test-feature/index.html',
        ],
    },
};
