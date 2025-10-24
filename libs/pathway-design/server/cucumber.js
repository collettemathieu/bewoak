module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/pathway-design/server/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/server/test-feature/index.html',
        ],
        paths: ['libs/pathway-design/server/src/lib/**/*.feature'],
        require: ['libs/pathway-design/server/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
