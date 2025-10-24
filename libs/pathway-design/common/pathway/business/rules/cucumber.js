module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/pathway-design/common/pathway/business/rules/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/common/pathway/business/rules/test-feature/index.html',
        ],
        paths: ['libs/pathway-design/common/pathway/business/rules/src/lib/**/*.feature'],
        require: ['libs/pathway-design/common/pathway/business/rules/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
