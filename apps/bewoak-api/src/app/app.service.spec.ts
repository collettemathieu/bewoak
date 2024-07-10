import { Test } from '@nestjs/testing';
import { beforeAll, describe, expect, test } from 'bun:test';

import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        service = app.get<AppService>(AppService);
    });

    describe('getData', () => {
        test('should return "Hello API"', () => {
            expect(service.getData()).toEqual({ message: 'Hello API' });
        });
    });
});
