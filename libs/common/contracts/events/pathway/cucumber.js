module.exports = {
    default: {
        paths: ['libs/common/contracts/events/pathway/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/common/contracts/events/pathway/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/common/contracts/events/pathway/test-feature/index.json',
            'html:dist/reports/libs/common/contracts/events/pathway/test-feature/index.html',
        ],
    },
};
