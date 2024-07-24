module.exports = {
    default: {
        paths: [
            'libs/pathway-design/server/pathway/interface-adapters/src/lib/**/*.feature',
        ],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: [
            'libs/pathway-design/server/pathway/interface-adapters/src/lib/**/*.step.ts',
        ],
        format: [
            'json:dist/reports/libs/pathway-design/pathway/interface-adapters/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/pathway/interface-adapters/test-feature/index.html',
        ],
    },
};
