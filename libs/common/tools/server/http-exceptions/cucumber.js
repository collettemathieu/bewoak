module.exports = {
    default: {
        paths: [
            'libs/common/tools/server/http-exceptions/src/lib/**/*.feature',
        ],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: [
            'libs/common/tools/server/http-exceptions/src/lib/**/*.step.ts',
        ],
        format: [
            'json:dist/reports/libs/common/tools/server/http-exceptions/test-feature/index.json',
            'html:dist/reports/libs/common/tools/server/http-exceptions/test-feature/index.html',
        ],
    },
};
