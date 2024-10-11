module.exports = {
    default: {
        paths: ['libs/common/configs/server/env/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/common/configs/server/env/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/common/configs/server/env/test-feature/index.json',
            'html:dist/reports/libs/common/configs/server/env/test-feature/index.html',
        ],
    },
};
