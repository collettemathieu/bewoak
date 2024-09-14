module.exports = {
    default: {
        paths: ['libs/common/events/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/common/events/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/common/events/test-feature/index.json',
            'html:dist/reports/libs/common/events/test-feature/index.html',
        ],
    },
};
