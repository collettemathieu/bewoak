module.exports = {
    default: {
        paths: ['libs/pathway-design/server/pathway/application/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/pathway-design/server/pathway/application/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/pathway-design/server/pathway/application/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/server/pathway/application/test-feature/index.html',
        ],
    },
};
