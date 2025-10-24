module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/search/pathway/infrastructure/test-feature/index.json',
            'html:dist/reports/libs/search/pathway/infrastructure/test-feature/index.html',
        ],
        paths: ['libs/search/server/pathway/infrastructure/src/lib/**/*.feature'],
        require: ['libs/search/server/pathway/infrastructure/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
