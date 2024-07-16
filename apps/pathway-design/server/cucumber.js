module.exports = {
    default: {
        paths: ['apps/pathway-design/server/src/test/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['apps/pathway-design/server/src/test/**/*.step.ts'],
        format: [
            'json:dist/reports/apps/pathway-design/server/test-feature/index.json',
            'html:dist/reports/apps/pathway-design/server/test-feature/index.html',
        ],
    },
};
