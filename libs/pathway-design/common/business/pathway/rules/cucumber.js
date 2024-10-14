module.exports = {
    default: {
        paths: ['libs/pathway-design/common/business/pathway/rules/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/pathway-design/common/business/pathway/rules/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/pathway-design/common/business/pathway/rules/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/common/business/pathway/rules/test-feature/index.html',
        ],
    },
};
