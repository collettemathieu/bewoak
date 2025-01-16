module.exports = {
    default: {
        paths: ['libs/pathway-design/common/pathway/business/rules/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/pathway-design/common/pathway/business/rules/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/pathway-design/common/pathway/business/rules/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/common/pathway/business/rules/test-feature/index.html',
        ],
    },
};
