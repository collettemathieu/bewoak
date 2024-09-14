module.exports = {
    default: {
        paths: ['apps/pathway-design/server/src/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['apps/pathway-design/server/src/**/*.step.ts'],
        format: [
            'json:dist/reports/apps/pathway-design/server/test-feature/index.json',
            'html:dist/reports/apps/pathway-design/server/test-feature/index.html',
        ],
    },
};
