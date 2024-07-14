module.exports = {
    default: {
        paths: ['apps/bewoak-api/src/tests/**/*.feature'],
        requireModule: ['ts-node/register'],
        require: ['apps/bewoak-api/src/tests/**/*.ts'],
        format: [
            'progress-bar',
            'json:dist/bewoak-api/tests/reports/cucumber_report.json',
        ],
    },
};
