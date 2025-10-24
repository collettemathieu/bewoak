module.exports = {
    default: {
        format: [
            'json:dist/reports/libs/pathway-design/pathway/interface-adapters/test-feature/index.json',
            'html:dist/reports/libs/pathway-design/pathway/interface-adapters/test-feature/index.html',
        ],
        paths: ['libs/pathway-design/server/pathway/interface-adapters/src/lib/**/*.feature'],
        require: ['libs/pathway-design/server/pathway/interface-adapters/src/lib/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
