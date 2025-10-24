import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { type CTSEInternalServerException, HttpStatus } from '@bewoak/common-http-exceptions-server';
import { ServerLogger } from '@bewoak/common-o11y-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { Test } from '@nestjs/testing';
import type { PathwayEntity } from '../../../../business/pathway/entities/pathway';
import { pathwayFactory } from '../../../../business/pathway/factories/pathway.factory';
import {
    PATHWAY_NOT_ADDED_IN_MEMORY,
    PATHWAY_NOT_SAVED_CORRECTLY_IN_MEMORY,
} from '../../common/in-memory/constants/in-memory-pathway.constants';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize-pathway-in-memory.persistence';

describe('InitializePathwayInMemoryPersistence', () => {
    describe('When I want to save a pathway in memory and there is no error', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let result: PathwayEntity;
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

            pathwayEntity = successValue(
                pathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            spyOn(serverLogger, 'error');

            spyOn(initializePathwayInMemoryPersistence, 'save');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'getByPathwayId');

            result = successValue(await initializePathwayInMemoryPersistence.save(pathwayEntity));
        });

        test('logger should not have been called', () => {
            expect(serverLogger.error).not.toHaveBeenCalled();
        });

        test('should call the save method with the pathway in parameter', () => {
            expect(initializePathwayInMemoryPersistence).toBeDefined();
            expect(initializePathwayInMemoryPersistence.save).toHaveBeenCalledWith(pathwayEntity);
        });

        test('should save the pathway in memory and return the pathway saved', () => {
            expect(pathwayInMemoryRepository.add).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.getByPathwayId).toHaveBeenCalledTimes(1);

            expect(result).toBe(pathwayEntity);
            expect(result.title).toStrictEqual(pathwayEntity.title);
            expect(result.description).toStrictEqual(pathwayEntity.description);
            expect(result.researchField).toStrictEqual(pathwayEntity.researchField);
        });
    });

    describe('When I want to save a pathway but the pathway is not recovered in memory', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
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

            pathwayEntity = successValue(
                pathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            result = failureValue(await initializePathwayInMemoryPersistence.save(pathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'InitializePathwayInMemoryPersistence' },
                { method: 'save' },
                { errors: {} }
            );
        });

        test('should send an error message', async () => {
            expect(result.message).toBe(PATHWAY_NOT_ADDED_IN_MEMORY);
            expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(result.name).toBe('InternalServerException');
        });
    });

    describe('When I want to save a pathway but the pathway is saved correctly in memory', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let result: CTSEInternalServerException;
        let serverLogger: ServerLogger;

        const descriptionPathway = 'pathway description';
        const pathwayId = 'pathway id';
        const researchFieldPathway = 'pathway research field';
        const titlePathway = 'pathway title';

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    InitializePathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            add: () => undefined,
                            getByPathwayId: () => ({
                                description: descriptionPathway,
                                pathwayId: pathwayId,
                                researchField: researchFieldPathway,
                                title: titlePathway,
                            }),
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

            pathwayEntity = successValue(
                pathwayFactory({
                    description: descriptionPathway,
                    researchField: researchFieldPathway,
                    title: titlePathway,
                })
            );

            result = failureValue(await initializePathwayInMemoryPersistence.save(pathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'InitializePathwayInMemoryPersistence' },
                { method: 'save' },
                { errors: {} }
            );
        });

        test('should send an error message', async () => {
            expect(result.message).toBe(PATHWAY_NOT_SAVED_CORRECTLY_IN_MEMORY);
            expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(result.name).toBe('InternalServerException');
        });
    });
});
