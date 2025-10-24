module.exports = {
    default: {
        format: [
            'json:dist/reports/apps/pathway-design/server/test-feature/index.json',
            'html:dist/reports/apps/pathway-design/server/test-feature/index.html',
        ],
        paths: ['apps/pathway-design/server/src/**/*.feature'],
        require: ['apps/pathway-design/server/src/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
