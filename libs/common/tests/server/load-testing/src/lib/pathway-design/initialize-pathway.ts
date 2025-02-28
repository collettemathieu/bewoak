import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    hosts: { 'test.io': '127.0.0.1:3000' },
    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 100 },
        { duration: '30s', target: 0 },
    ],
    thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
    noConnectionReuse: true,
    userAgent: 'MyK6UserAgentString/1.0',
};

export default function () {
    http.post('http://localhost:3000/api/pathway/initialize', {
        title: 'arterial stiffness',
        description: 'Understand the role of the arterial stiffness',
        researchField: 'biomechanics',
    });

    sleep(1);
}
