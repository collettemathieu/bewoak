import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { ServerLogger } from '@bewoak/common-o11y-server';
import { successValue } from '@bewoak/common-types-result';
import { Test } from '@nestjs/testing';
import { PathwayEntity } from '../../../../models/entities/pathway';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { IndexPathwayInMemoryPersistence } from '../../index/in-memory/index-pathway-in-memory.persistence';
import { ReadManyPathwayInMemoryPersistence } from './read-many-pathway-in-memory.persistence';

describe('ReadManyPathwayInMemoryPersistence', () => {
    describe('When I want retrieve all pathways indexed in memory and there is no error', () => {
        let readManyPathwayInMemoryPersistence: ReadManyPathwayInMemoryPersistence;
        let pathwayEntity1: PathwayEntity;
        let pathwayEntity2: PathwayEntity;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let indexPathwayInMemoryPersistence: IndexPathwayInMemoryPersistence;
        let result: PathwayEntity[];
        let serverLogger: ServerLogger;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [ReadManyPathwayInMemoryPersistence, IndexPathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            serverLogger = new ServerLogger('', '');
            module.useLogger(serverLogger);

            readManyPathwayInMemoryPersistence = module.get<ReadManyPathwayInMemoryPersistence>(
                ReadManyPathwayInMemoryPersistence
            );
            indexPathwayInMemoryPersistence = module.get<IndexPathwayInMemoryPersistence>(IndexPathwayInMemoryPersistence);

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            const date1 = new Date();
            pathwayEntity1 = successValue(
                PathwayEntity.create({
                    createdAt: date1,
                    description: 'pathway description 1',
                    pathwayId: 'pathway id 1',
                    researchField: 'pathway research field 1',
                    title: 'pathway title 1',
                    updatedAt: date1,
                })
            );

            const date2 = new Date();
            pathwayEntity2 = successValue(
                PathwayEntity.create({
                    createdAt: date2,
                    description: 'pathway description 2',
                    pathwayId: 'pathway id 2',
                    researchField: 'pathway research field 2',
                    title: 'pathway title 2',
                    updatedAt: date2,
                })
            );

            spyOn(serverLogger, 'error');

            spyOn(readManyPathwayInMemoryPersistence, 'readMany');
            spyOn(pathwayInMemoryRepository, 'getAll');

            await indexPathwayInMemoryPersistence.index(pathwayEntity1);
            await indexPathwayInMemoryPersistence.index(pathwayEntity2);

            result = successValue(await readManyPathwayInMemoryPersistence.readMany());
        });

        test('logger should not have been called', () => {
            expect(serverLogger.error).not.toHaveBeenCalled();
        });

        test('should call the save method with the pathway in parameter', () => {
            expect(readManyPathwayInMemoryPersistence).toBeDefined();
            expect(readManyPathwayInMemoryPersistence.readMany).toHaveBeenCalledWith();
        });

        test('should retrieve all pathways indexed in memory and return an array of pathways indexed', () => {
            expect(pathwayInMemoryRepository.getAll).toHaveBeenCalledTimes(1);

            expect(result).toHaveLength(2);

            expect(result[0]).toBeInstanceOf(PathwayEntity);
            expect(result[0].pathwayId).toBe(pathwayEntity1.pathwayId);
            expect(result[0].title).toStrictEqual(pathwayEntity1.title);
            expect(result[0].description).toStrictEqual(pathwayEntity1.description);
            expect(result[0].researchField).toStrictEqual(pathwayEntity1.researchField);
            expect(result[0].createdAt).toStrictEqual(pathwayEntity1.createdAt);
            expect(result[0].updatedAt).toStrictEqual(pathwayEntity1.updatedAt);

            expect(result[1]).toBeInstanceOf(PathwayEntity);
            expect(result[1].pathwayId).toBe(pathwayEntity2.pathwayId);
            expect(result[1].title).toStrictEqual(pathwayEntity2.title);
            expect(result[1].description).toStrictEqual(pathwayEntity2.description);
            expect(result[1].researchField).toStrictEqual(pathwayEntity2.researchField);
            expect(result[1].createdAt).toStrictEqual(pathwayEntity2.createdAt);
            expect(result[1].updatedAt).toStrictEqual(pathwayEntity2.updatedAt);
        });
    });
});
