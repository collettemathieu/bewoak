module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/search/server/pathway/application/test-feature/index.json',
            'html:dist/reports/libs/search/server/pathway/application/test-feature/index.html',
        ],
        paths: ['libs/search/server/pathway/application/src/lib/**/*.feature'],
        require: ['libs/search/server/pathway/application/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
