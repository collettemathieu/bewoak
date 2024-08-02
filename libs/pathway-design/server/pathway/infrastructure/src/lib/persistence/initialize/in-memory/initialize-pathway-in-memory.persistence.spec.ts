import {
    type PDSPBEPathwayEntity,
    PDSPBFpathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize-pathway-in-memory.persistence';

describe('InitializePathwayInMemoryPersistence', () => {
    describe('When I want to save a pathway in memory and there is no error', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let result: PDSPBEPathwayEntity;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    InitializePathwayInMemoryPersistence,
                    PathwayInMemoryRepository,
                ],
            }).compile();

            initializePathwayInMemoryPersistence =
                module.get<InitializePathwayInMemoryPersistence>(
                    InitializePathwayInMemoryPersistence
                );

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(
                PathwayInMemoryRepository
            );

            pDSPBEPathwayEntity = PDSPBFpathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            spyOn(initializePathwayInMemoryPersistence, 'save');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'get');

            result =
                await initializePathwayInMemoryPersistence.save(
                    pDSPBEPathwayEntity
                );
        });

        test('should call the save method with the pathway in parameter', () => {
            expect(initializePathwayInMemoryPersistence).toBeDefined();
            expect(
                initializePathwayInMemoryPersistence.save
            ).toHaveBeenCalledWith(pDSPBEPathwayEntity);
        });

        test('should save the pathway in memory and return the pathway saved', () => {
            expect(pathwayInMemoryRepository.add).toHaveBeenCalledTimes(1);
            expect(pathwayInMemoryRepository.get).toHaveBeenCalledTimes(1);

            expect(result.id).not.toBeUndefined();
            expect(result).not.toBe(pDSPBEPathwayEntity);
            expect(
                result.equals({
                    description: pDSPBEPathwayEntity.description?.value ?? '',
                    researchField:
                        pDSPBEPathwayEntity.researchField?.value ?? '',
                    title: pDSPBEPathwayEntity.title?.value ?? '',
                })
            ).toBe(true);
        });
    });

    describe('When I want to save a pathway but the pathway is not recovered in memory', () => {
        let initializePathwayInMemoryPersistence: InitializePathwayInMemoryPersistence;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    InitializePathwayInMemoryPersistence,
                    {
                        provide: PathwayInMemoryRepository,
                        useValue: {
                            add: () => undefined,
                            get: () => undefined,
                        },
                    },
                ],
            }).compile();

            initializePathwayInMemoryPersistence =
                module.get<InitializePathwayInMemoryPersistence>(
                    InitializePathwayInMemoryPersistence
                );

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(
                PathwayInMemoryRepository
            );

            pDSPBEPathwayEntity = PDSPBFpathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            spyOn(initializePathwayInMemoryPersistence, 'save');
            spyOn(pathwayInMemoryRepository, 'add');
            spyOn(pathwayInMemoryRepository, 'get');
        });

        test('should throw an error', async () => {
            try {
                await initializePathwayInMemoryPersistence.save(
                    pDSPBEPathwayEntity
                );
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as NotFoundException).message).toBe(
                    'Pathway not found in memory'
                );
            }
        });
    });
});
