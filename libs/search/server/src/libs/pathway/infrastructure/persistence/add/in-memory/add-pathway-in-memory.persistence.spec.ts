import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PathwayEntity } from '../../../../models/entities/pathway';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { AddPathwayInMemoryPersistence } from './add-pathway-in-memory.persistence';

describe('AddPathwayInMemoryPersistence', () => {
    describe('When I want to add a pathway in memory and there is no error', () => {
        let addPathwayInMemoryPersistence: AddPathwayInMemoryPersistence;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let pathwayEntity: PathwayEntity;
        let result: PathwayEntity;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [AddPathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            addPathwayInMemoryPersistence = module.get<AddPathwayInMemoryPersistence>(AddPathwayInMemoryPersistence);

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            pathwayEntity = new PathwayEntity('pathway description', 'id', 'pathway research field', 'pathway title');

            spyOn(addPathwayInMemoryPersistence, 'add');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'get');

            result = await addPathwayInMemoryPersistence.add(pathwayEntity);
        });

        test('should call the add method with the pathway in parameter', () => {
            expect(addPathwayInMemoryPersistence).toBeDefined();
            expect(addPathwayInMemoryPersistence.add).toHaveBeenCalledWith(pathwayEntity);
        });

        test('should add the pathway in memory and return the pathway added', () => {
            expect(pathwayInMemoryRepository.add).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.get).toHaveBeenCalledTimes(1);

            expect(result.id).not.toBeEmpty();
            expect(result).not.toBe(pathwayEntity);
            expect(result.title).toStrictEqual(pathwayEntity.title);
            expect(result.description).toStrictEqual(pathwayEntity.description);
            expect(result.researchField).toStrictEqual(pathwayEntity.researchField);
        });
    });

    describe('When I want to add a pathway but the pathway is not recovered in memory', () => {
        let addPathwayInMemoryPersistence: AddPathwayInMemoryPersistence;
        let pathwayEntity: PathwayEntity;

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

            pathwayEntity = new PathwayEntity('pathway description', 'id', 'pathway research field', 'pathway title');
        });

        test('should throw an error', async () => {
            try {
                await addPathwayInMemoryPersistence.add(pathwayEntity);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as NotFoundException).message).toBe('Pathway not found in memory');
            }
        });
    });
});
