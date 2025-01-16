import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { SSPMEPathwayEntity } from '@bewoak/search-server-pathway-models';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { AddPathwayInMemoryPersistence } from './add-pathway-in-memory.persistence';

describe('AddPathwayInMemoryPersistence', () => {
    describe('When I want to add a pathway in memory and there is no error', () => {
        let addPathwayInMemoryPersistence: AddPathwayInMemoryPersistence;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let sSPMEPathwayEntity: SSPMEPathwayEntity;
        let result: SSPMEPathwayEntity;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [AddPathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            addPathwayInMemoryPersistence = module.get<AddPathwayInMemoryPersistence>(AddPathwayInMemoryPersistence);

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            sSPMEPathwayEntity = new SSPMEPathwayEntity('pathway description', 'id', 'pathway research field', 'pathway title');

            spyOn(addPathwayInMemoryPersistence, 'add');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'get');

            result = await addPathwayInMemoryPersistence.add(sSPMEPathwayEntity);
        });

        test('should call the add method with the pathway in parameter', () => {
            expect(addPathwayInMemoryPersistence).toBeDefined();
            expect(addPathwayInMemoryPersistence.add).toHaveBeenCalledWith(sSPMEPathwayEntity);
        });

        test('should add the pathway in memory and return the pathway added', () => {
            expect(pathwayInMemoryRepository.add).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.get).toHaveBeenCalledTimes(1);

            expect(result.id).not.toBeEmpty();
            expect(result).not.toBe(sSPMEPathwayEntity);
            expect(result.title).toStrictEqual(sSPMEPathwayEntity.title);
            expect(result.description).toStrictEqual(sSPMEPathwayEntity.description);
            expect(result.researchField).toStrictEqual(sSPMEPathwayEntity.researchField);
        });
    });

    describe('When I want to add a pathway but the pathway is not recovered in memory', () => {
        let addPathwayInMemoryPersistence: AddPathwayInMemoryPersistence;
        let sSPMEPathwayEntity: SSPMEPathwayEntity;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    AddPathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            add: () => undefined,
                            get: () => undefined,
                        },
                    },
                ],
            }).compile();

            addPathwayInMemoryPersistence = module.get<AddPathwayInMemoryPersistence>(AddPathwayInMemoryPersistence);

            sSPMEPathwayEntity = new SSPMEPathwayEntity('pathway description', 'id', 'pathway research field', 'pathway title');
        });

        test('should throw an error', async () => {
            try {
                await addPathwayInMemoryPersistence.add(sSPMEPathwayEntity);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as NotFoundException).message).toBe('Pathway not found in memory');
            }
        });
    });
});
