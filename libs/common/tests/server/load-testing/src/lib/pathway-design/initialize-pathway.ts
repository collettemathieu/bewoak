import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    hosts: { 'test.io': '127.0.0.1:3000' },
    noConnectionReuse: true,
    stages: [
        { duration: '10s', target: 100 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 10000 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
    userAgent: 'MyK6UserAgentString/1.0',
};

export default function () {
    http.post('http://localhost:3000/api/pathway/initialize', {
        description: 'Understand the role of the arterial stiffness',
        researchField: 'biomechanics',
        title: 'arterial stiffness',
    });

    sleep(1);
}
