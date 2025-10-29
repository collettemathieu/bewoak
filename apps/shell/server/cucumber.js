module.exports = {
    default: {
        format: [
            'json:dist/reports/apps/shell/server/test-feature/index.json',
            'html:dist/reports/apps/shell/server/test-feature/index.html',
        ],
        paths: ['apps/shell/server/src/**/*.feature'],
        require: ['apps/shell/server/src/**/*.step.ts'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    },
};
