module.exports = {
    default: {
        paths: ['libs/search/server/pathway/models/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/search/server/pathway/models/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/search/server/pathway/models/test-feature/index.json',
            'html:dist/reports/libs/search/server/pathway/models/test-feature/index.html',
        ],
    },
};
