import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import type { CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import { ServerLogger } from '@bewoak/common-log-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { type PDSPBEPathwayEntity, pDSPBFPathwayFactory } from '@bewoak/pathway-design-server-pathway-business';
import { Test } from '@nestjs/testing';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize-pathway-in-memory.persistence';

describe('InitializePathwayInMemoryPersistence', () => {
    describe('When I want to save a pathway in memory and there is no error', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let result: PDSPBEPathwayEntity;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [InitializePathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);

            initializePathwayInMemoryPersistence = module.get<InitializePathwayInMemoryPersistence>(
                InitializePathwayInMemoryPersistence
            );

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            pDSPBEPathwayEntity = pDSPBFPathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            spyOn(serverLogger, 'error');

            spyOn(initializePathwayInMemoryPersistence, 'save');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'getByPathwayId');

            result = successValue(await initializePathwayInMemoryPersistence.save(pDSPBEPathwayEntity));
        });

        test('logger should not have been called', () => {
            expect(serverLogger.error).not.toHaveBeenCalled();
        });

        test('should call the save method with the pathway in parameter', () => {
            expect(initializePathwayInMemoryPersistence).toBeDefined();
            expect(initializePathwayInMemoryPersistence.save).toHaveBeenCalledWith(pDSPBEPathwayEntity);
        });

        test('should save the pathway in memory and return the pathway saved', () => {
            expect(pathwayInMemoryRepository.add).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.getByPathwayId).toHaveBeenCalledTimes(1);

            expect(result).not.toBe(pDSPBEPathwayEntity);
            expect(result.title).toStrictEqual(pDSPBEPathwayEntity.title);
            expect(result.description).toStrictEqual(pDSPBEPathwayEntity.description);
            expect(result.researchField).toStrictEqual(pDSPBEPathwayEntity.researchField);
        });
    });

    describe('When I want to save a pathway but the pathway is not recovered in memory', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let result: CTSEInternalServerException;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    InitializePathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            add: () => undefined,
                            getByPathwayId: () => undefined,
                        },
                    },
                ],
            }).compile();

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);

            spyOn(serverLogger, 'error');

            initializePathwayInMemoryPersistence = module.get<InitializePathwayInMemoryPersistence>(
                InitializePathwayInMemoryPersistence
            );

            pDSPBEPathwayEntity = pDSPBFPathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            result = failureValue(await initializePathwayInMemoryPersistence.save(pDSPBEPathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'InitializePathwayInMemoryPersistence' },
                { method: 'save' }
            );
        });

        test('should send an error message', async () => {
            expect(result.message).toBe('Pathway was not been added in memory');
            expect(result.statusCode).toBe(500);
            expect(result.name).toBe('InternalServerErrorException');
        });
    });
});
