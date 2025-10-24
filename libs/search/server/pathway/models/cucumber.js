module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/search/server/pathway/models/test-feature/index.json',
            'html:dist/reports/libs/search/server/pathway/models/test-feature/index.html',
        ],
        paths: ['libs/search/server/pathway/models/src/lib/**/*.feature'],
        require: ['libs/search/server/pathway/models/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
