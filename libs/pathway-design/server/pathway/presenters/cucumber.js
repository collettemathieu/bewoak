module.exports = {
    default: {
        paths: ['libs/pathway-design/server/pathway/presenters/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/pathway-design/server/pathway/presenters/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/pathway-design/pathway/presenters/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/pathway/presenters/test-feature/index.html',
        ],
    },
};
