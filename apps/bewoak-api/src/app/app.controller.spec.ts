import { Test, type TestingModule } from '@nestjs/testing';
import { beforeAll, describe, expect, test } from 'bun:test';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
    });

    describe('getData', () => {
        test('should return "Hello API"', () => {
            const appController = app.get<AppController>(AppController);
            expect(appController.getData()).toEqual({ message: 'Hello API' });
        });
    });
});
