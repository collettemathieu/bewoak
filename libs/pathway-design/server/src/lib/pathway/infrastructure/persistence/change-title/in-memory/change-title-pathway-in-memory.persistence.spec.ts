import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { type CTSENotFoundRequestException, HttpStatus } from '@bewoak/common-http-exceptions-server';
import { ServerLogger } from '@bewoak/common-o11y-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { Test } from '@nestjs/testing';
import type { PathwayEntity } from '../../../../business/pathway/entities/pathway';
import { pathwayFactory } from '../../../../business/pathway/factories/pathway.factory';
import {
    PATHWAY_NOT_FOUND_IN_MEMORY,
    PATHWAY_TITLE_NOT_CHANGED_IN_MEMORY,
} from '../../common/in-memory/constants/in-memory-pathway.constants';
import { mapPathwayEntityToInMemoryPersistence } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { ChangeTitlePathwayInMemoryPersistence } from './change-title-pathway-in-memory.persistence';

describe('ChangeTitlePathwayInMemoryPersistence', () => {
    describe('When I want to change the title of a pathway in memory and there is no error', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let result: PathwayEntity;
        let serverLogger: ServerLogger;

        const newTitle = 'new pathway title';

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [ChangeTitlePathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            pathwayEntity = successValue(
                pathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: newTitle,
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);

            const peristenceModel = mapPathwayEntityToInMemoryPersistence(pathwayEntity);
            pathwayInMemoryRepository.add(peristenceModel);

            spyOn(serverLogger, 'error');

            spyOn(changeTitlePathwayInMemoryPersistence, 'changeTitle');
            spyOn(pathwayInMemoryRepository, 'patch');
            spyOn(pathwayInMemoryRepository, 'getByPathwayId');

            result = successValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pathwayEntity));
        });

        test('logger should not have been called', () => {
            expect(serverLogger.error).not.toHaveBeenCalled();
        });

        test('should call the change title method with the title of the pathway in parameter', () => {
            expect(changeTitlePathwayInMemoryPersistence).toBeDefined();
            expect(changeTitlePathwayInMemoryPersistence.changeTitle).toHaveBeenCalledWith(pathwayEntity);
        });

        test('should save the pathway in memory and return the pathway saved', () => {
            expect(pathwayInMemoryRepository.patch).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.getByPathwayId).toHaveBeenCalledTimes(2);

            expect(result).toBe(pathwayEntity);
            expect(result.title).toStrictEqual(newTitle);
            expect(result.description).toStrictEqual(pathwayEntity.description);
            expect(result.researchField).toStrictEqual(pathwayEntity.researchField);
        });
    });

    describe('When I want to change the title of a pathway and the pathway was never saved in memory', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let result: CTSENotFoundRequestException;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [ChangeTitlePathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pathwayEntity = successValue(
                pathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);
            spyOn(serverLogger, 'error');

            result = failureValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'ChangeTitlePathwayInMemoryPersistence' },
                { method: 'changeTitle' },
                { errors: {} }
            );
        });

        test('should send an exception message', async () => {
            expect(result.message).toBe(PATHWAY_NOT_FOUND_IN_MEMORY);
            expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(result.name).toBe('NotFoundRequestException');
        });
    });

    describe('When I want to change the title of a pathway and the pathway is not recovered in memory', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let result: CTSENotFoundRequestException;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    ChangeTitlePathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            getByPathwayId: () => undefined,
                            patch: () => undefined,
                        },
                    },
                ],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pathwayEntity = successValue(
                pathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);
            spyOn(serverLogger, 'error');

            result = failureValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'ChangeTitlePathwayInMemoryPersistence' },
                { method: 'changeTitle' },
                { errors: {} }
            );
        });

        test('should send an exception message', async () => {
            expect(result.message).toBe(PATHWAY_NOT_FOUND_IN_MEMORY);
            expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(result.name).toBe('NotFoundRequestException');
        });
    });

    describe('When I want to change the title of a pathway and the title of the pathway is not saved in memory', () => {
        const newTitle = 'new pathway title';
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let result: CTSENotFoundRequestException;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    ChangeTitlePathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            getByPathwayId: () => undefined,
                            patch: () => ({
                                title: 'pathway title',
                            }),
                        },
                    },
                ],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pathwayEntity = successValue(
                pathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: newTitle,
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);
            spyOn(serverLogger, 'error');

            result = failureValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'ChangeTitlePathwayInMemoryPersistence' },
                { method: 'changeTitle' },
                { errors: {} }
            );
        });

        test('should send an exception message', async () => {
            expect(result.message).toBe(PATHWAY_TITLE_NOT_CHANGED_IN_MEMORY);
            expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(result.name).toBe('InternalServerException');
        });
    });
});
