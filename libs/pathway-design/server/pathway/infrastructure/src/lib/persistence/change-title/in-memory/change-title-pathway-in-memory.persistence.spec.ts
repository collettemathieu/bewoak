import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { type PDSPBEPathwayEntity, pDSPBFPathwayFactory } from '@bewoak/pathway-design-server-pathway-business';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mapPathwayEntityToInMemoryPersistence } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { ChangeTitlePathwayInMemoryPersistence } from './change-title-pathway-in-memory.persistence';

describe('ChangeTitlePathwayInMemoryPersistence', () => {
    describe('When I want to change the title of a pathway in memory and there is no error', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pathwayInMemoryRepository: PathwayInMemoryRepository;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        let result: PDSPBEPathwayEntity;
        const newTitle = 'new pathway title';

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [ChangeTitlePathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pathwayInMemoryRepository = module.get<PathwayInMemoryRepository>(PathwayInMemoryRepository);

            pDSPBEPathwayEntity = pDSPBFPathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            const peristenceModel = mapPathwayEntityToInMemoryPersistence(pDSPBEPathwayEntity);
            pathwayInMemoryRepository.add(peristenceModel);

            spyOn(changeTitlePathwayInMemoryPersistence, 'changeTitle');
            spyOn(pathwayInMemoryRepository, 'patch');
            spyOn(pathwayInMemoryRepository, 'getByPathwayId');

            result = await changeTitlePathwayInMemoryPersistence.changeTitle(pDSPBEPathwayEntity.pathwayId, newTitle);
        });

        test('should call the change title method with the title of the pathway in parameter', () => {
            expect(changeTitlePathwayInMemoryPersistence).toBeDefined();
            expect(changeTitlePathwayInMemoryPersistence.changeTitle).toHaveBeenCalledWith(
                pDSPBEPathwayEntity.pathwayId,
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
        const newTitle = 'new pathway title';

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [ChangeTitlePathwayInMemoryPersistence, PathwayInMemoryRepository],
            }).compile();

            changeTitlePathwayInMemoryPersistence = module.get<ChangeTitlePathwayInMemoryPersistence>(
                ChangeTitlePathwayInMemoryPersistence
            );

            pDSPBEPathwayEntity = pDSPBFPathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });
        });

        test('should throw an error', async () => {
            try {
                await changeTitlePathwayInMemoryPersistence.changeTitle(pDSPBEPathwayEntity.pathwayId, newTitle);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as NotFoundException).message).toMatch(
                    'An error has occurred while changing the title of the pathway:'
                );
            }
        });
    });

    describe('When I want to change the title of a pathway and the pathway is not recovered in memory', () => {
        let changeTitlePathwayInMemoryPersistence: ChangeTitlePathwayInMemoryPersistence;
        let pDSPBEPathwayEntity: PDSPBEPathwayEntity;
        const newTitle = 'new pathway title';

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

            pDSPBEPathwayEntity = pDSPBFPathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });
        });

        test('should throw an error', async () => {
            try {
                await changeTitlePathwayInMemoryPersistence.changeTitle(pDSPBEPathwayEntity.pathwayId, newTitle);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as NotFoundException).message).toBe('Pathway not found in memory');
            }
        });
    });
});
