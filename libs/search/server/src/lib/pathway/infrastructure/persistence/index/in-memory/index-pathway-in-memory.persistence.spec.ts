import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { type CTSEInternalServerException, HttpStatus } from '@bewoak/common-http-exceptions-server';
import { ServerLogger } from '@bewoak/common-o11y-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { Test } from '@nestjs/testing';
import { PathwayEntity } from '../../../../models/entities/pathway';
import { PATHWAY_NOT_INDEXED_CORRECTLY_IN_MEMORY } from '../../common/in-memory/constants/in-memory-pathway.constants';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { IndexPathwayInMemoryPersistence } from './index-pathway-in-memory.persistence';

describe('IndexPathwayInMemoryPersistence', () => {
    describe('When I want to index a pathway in memory and there is no error', () => {
        let indexPathwayInMemoryPersistence: IndexPathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let result: PathwayEntity;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [IndexPathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);

            indexPathwayInMemoryPersistence = module.get<IndexPathwayInMemoryPersistence>(IndexPathwayInMemoryPersistence);

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            pathwayEntity = new PathwayEntity('pathway id', 'pathway title', 'pathway description', 'pathway research field');

            spyOn(serverLogger, 'error');

            spyOn(indexPathwayInMemoryPersistence, 'index');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'getByPathwayId');

            result = successValue(await indexPathwayInMemoryPersistence.index(pathwayEntity));
        });

        test('logger should not have been called', () => {
            expect(serverLogger.error).not.toHaveBeenCalled();
        });

        test('should call the index method with the pathway in parameter', () => {
            expect(indexPathwayInMemoryPersistence).toBeDefined();
            expect(indexPathwayInMemoryPersistence.index).toHaveBeenCalledWith(pathwayEntity);
        });

        test('should index the pathway in memory and return the pathway saved', () => {
            expect(pathwayInMemoryRepository.add).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.getByPathwayId).toHaveBeenCalledTimes(1);

            expect(result).toBe(pathwayEntity);
            expect(result.title).toStrictEqual(pathwayEntity.title);
            expect(result.description).toStrictEqual(pathwayEntity.description);
            expect(result.researchField).toStrictEqual(pathwayEntity.researchField);
        });
    });

    describe('When I want to index a pathway but the pathway is not recovered in memory', () => {
        let indexPathwayInMemoryPersistence: IndexPathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;
        let result: CTSEInternalServerException;
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    IndexPathwayInMemoryPersistence,
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

            indexPathwayInMemoryPersistence = module.get<IndexPathwayInMemoryPersistence>(IndexPathwayInMemoryPersistence);

            pathwayEntity = new PathwayEntity('pathway id', 'pathway title', 'pathway description', 'pathway research field');

            result = failureValue(await indexPathwayInMemoryPersistence.index(pathwayEntity));
        });

        test('logger should have been called', () => {
            expect(serverLogger.error).toHaveBeenCalledTimes(1);
            expect(serverLogger.error).toHaveBeenCalledWith(
                result.message,
                result,
                { constructor: 'IndexPathwayInMemoryPersistence' },
                { method: 'index' },
                { errors: {} }
            );
        });

        test('should send an error message', async () => {
            expect(result.message).toBe(PATHWAY_NOT_INDEXED_CORRECTLY_IN_MEMORY);
            expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(result.name).toBe('InternalServerException');
        });
    });
});
