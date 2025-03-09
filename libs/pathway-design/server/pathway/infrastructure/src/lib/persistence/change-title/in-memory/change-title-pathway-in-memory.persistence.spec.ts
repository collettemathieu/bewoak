import { type CTSENotFoundRequestException, HttpStatus } from '@bewoak/common-http-exceptions-server';
import { ServerLogger } from '@bewoak/common-log-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { type PDSPBEPathwayEntity, pDSPBFPathwayFactory } from '@bewoak/pathway-design-server-pathway-business';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { mapPathwayEntityToInMemoryPersistence } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { ChangeTitlePathwayInMemoryPersistence } from './change-title-pathway-in-memory.persistence';

describe('ChangeTitlePathwayInMemoryPersistence', () => {
    describe('When I want to change the title of a pathway in memory and there is no error', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let result: PDSPBEPathwayEntity;
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

            pDSPBEPathwayEntity = successValue(
                pDSPBFPathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);

            const peristenceModel = mapPathwayEntityToInMemoryPersistence(pDSPBEPathwayEntity);
            pathwayInMemoryRepository.add(peristenceModel);

            spyOn(serverLogger, 'error');

            spyOn(changeTitlePathwayInMemoryPersistence, 'changeTitle');
            spyOn(pathwayInMemoryRepository, 'patch');
            spyOn(pathwayInMemoryRepository, 'getByPathwayId');

            result = successValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pDSPBEPathwayEntity, newTitle));
        });

        test('logger should not have been called', () => {
            expect(serverLogger.error).not.toHaveBeenCalled();
        });

        test('should call the change title method with the title of the pathway in parameter', () => {
            expect(changeTitlePathwayInMemoryPersistence).toBeDefined();
            expect(changeTitlePathwayInMemoryPersistence.changeTitle).toHaveBeenCalledWith(
                pDSPBEPathwayEntity,
                'new pathway title'
            );
        });

        test('should save the pathway in memory and return the pathway saved', () => {
            expect(pathwayInMemoryRepository.patch).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.getByPathwayId).toHaveBeenCalledTimes(2);

            expect(result).not.toBe(pDSPBEPathwayEntity);
            expect(result.title).toStrictEqual(newTitle);
            expect(result.description).toStrictEqual(pDSPBEPathwayEntity.description);
            expect(result.researchField).toStrictEqual(pDSPBEPathwayEntity.researchField);
        });
    });

    describe('When I want to change the title of a pathway and the pathway was never saved in memory', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let result: CTSENotFoundRequestException;
        let serverLogger: ServerLogger;

        const newTitle = 'new pathway title';

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [ChangeTitlePathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pDSPBEPathwayEntity = successValue(
                pDSPBFPathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);
            spyOn(serverLogger, 'error');

            result = failureValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pDSPBEPathwayEntity, newTitle));
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
            expect(result.message).toBe('Pathway not found in memory');
            expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(result.name).toBe('NotFoundRequestException');
        });
    });

    describe('When I want to change the title of a pathway and the pathway is not recovered in memory', () => {
        const newTitle = 'new pathway title';
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let result: CTSENotFoundRequestException;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    ChangeTitlePathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            patch: () => undefined,
                            getByPathwayId: () => undefined,
                        },
                    },
                ],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pDSPBEPathwayEntity = successValue(
                pDSPBFPathwayFactory({
                    description: 'pathway description',
                    researchField: 'pathway research field',
                    title: 'pathway title',
                })
            );

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);
            spyOn(serverLogger, 'error');

            result = failureValue(await changeTitlePathwayInMemoryPersistence.changeTitle(pDSPBEPathwayEntity, newTitle));
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
            expect(result.message).toBe('Pathway not found in memory');
            expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(result.name).toBe('NotFoundRequestException');
        });
    });
});
