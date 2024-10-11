module.exports = {
    default: {
        paths: ['libs/common/configs/server/swagger/src/lib/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['libs/common/configs/server/swagger/src/lib/**/*.step.ts'],
        format: [
            'json:dist/reports/libs/common/configs/server/swagger/test-feature/index.json',
            'html:dist/reports/libs/common/configs/server/swagger/test-feature/index.html',
        ],
    },
};
