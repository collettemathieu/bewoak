module.exports = {
    default: {
        paths: ['apps/learning-design/src/tests/**/*.feature'],
        requireModule: ['ts-node/register'],
        require: ['apps/learning-design/src/tests/**/*.ts'],
        format: [
            'progress-bar',
            'json:dist/learning-design/tests/reports/cucumber_report.json',
        ],
    },
};
