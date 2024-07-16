module.exports = {
    default: {
        paths: [
            'libs/pathway-design/server/pathway/business/src/lib/**/*.feature',
        ],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: [
            'libs/pathway-design/server/pathway/business/src/lib/**/*.step.ts',
        ],
        format: [
            'json:dist/reports/libs/pathway-design/pathway/business/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/pathway/business/test-feature/index.html',
        ],
    },
};
