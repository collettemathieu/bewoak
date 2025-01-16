module.exports = {
    default: {
        paths: ['libs/search/server/pathway/infrastructure/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/search/server/pathway/infrastructure/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/search/pathway/infrastructure/test-feature/index.json',
            'html:dist/reports/libs/search/pathway/infrastructure/test-feature/index.html',
        ],
    },
};
