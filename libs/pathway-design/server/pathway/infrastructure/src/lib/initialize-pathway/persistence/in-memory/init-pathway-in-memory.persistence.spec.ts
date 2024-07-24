import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import {
    type PDSPBEPathwayEntity,
    PDSPBFpathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { type Observable, isObservable } from 'rxjs';
import { InMemoryPathwayRepository } from '../../../common/persistence/in-memory/repositories/in-memory-pathway.repository';
import { PDIIPPInitPathwayInMemory } from './init-pathway-in-memory.persistence';

describe('PDIIPPInitPathwayInMemory', () => {
    describe('When I save a pathway and the pathway is saved', () => {
        let PDIIPPinitPathwayInMemory: PDIIPPInitPathwayInMemory;
        let inMemoryPathwayRepository: InMemoryPathwayRepository;
        let PDSPBEpathwayEntity: PDSPBEPathwayEntity;
        let result: Observable<PDSPBEPathwayEntity>;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    PDIIPPInitPathwayInMemory,
                    InMemoryPathwayRepository,
                ],
            }).compile();

            PDIIPPinitPathwayInMemory = module.get<PDIIPPInitPathwayInMemory>(
                PDIIPPInitPathwayInMemory
            );

            inMemoryPathwayRepository = module.get<InMemoryPathwayRepository>(
                InMemoryPathwayRepository
            );

            PDSPBEpathwayEntity = PDSPBFpathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            spyOn(PDIIPPinitPathwayInMemory, 'save');
            spyOn(inMemoryPathwayRepository, 'add');
            spyOn(inMemoryPathwayRepository, 'get');

            result = PDIIPPinitPathwayInMemory.save(PDSPBEpathwayEntity);
        });

        test('should call the save method with the pathway in parameter', () => {
            expect(PDIIPPinitPathwayInMemory).toBeDefined();
            expect(PDIIPPinitPathwayInMemory.save).toHaveBeenCalledWith(
                PDSPBEpathwayEntity
            );
        });

        test('should save the pathway in memory and return the pathway saved', (done) => {
            expect(isObservable(result)).toBe(true);
            expect(inMemoryPathwayRepository.add).toHaveBeenCalledTimes(1);
            expect(inMemoryPathwayRepository.get).toHaveBeenCalledTimes(1);

            result.subscribe({
                next: (pathwayInMemory) => {
                    expect(pathwayInMemory.id).not.toBeUndefined();
                    expect(pathwayInMemory).not.toBe(PDSPBEpathwayEntity);
                    expect(
                        pathwayInMemory.equals({
                            description:
                                PDSPBEpathwayEntity.description?.value ?? '',
                            researchField:
                                PDSPBEpathwayEntity.researchField?.value ?? '',
                            title: PDSPBEpathwayEntity.title?.value ?? '',
                        })
                    ).toBe(true);
                    done();
                },
                error: (err) => done(err),
            });
        });
    });

    describe('When I save a pathway and the pathway is not saved', () => {
        let PDIIPPinitPathwayInMemory: PDIIPPInitPathwayInMemory;
        let inMemoryPathwayRepository: InMemoryPathwayRepository;
        let PDSPBEpathwayEntity: PDSPBEPathwayEntity;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    PDIIPPInitPathwayInMemory,
                    {
                        provide: InMemoryPathwayRepository,
                        useValue: {
                            add: () => undefined,
                            get: () => undefined,
                        },
                    },
                ],
            }).compile();

            PDIIPPinitPathwayInMemory = module.get<PDIIPPInitPathwayInMemory>(
                PDIIPPInitPathwayInMemory
            );

            inMemoryPathwayRepository = module.get<InMemoryPathwayRepository>(
                InMemoryPathwayRepository
            );

            PDSPBEpathwayEntity = PDSPBFpathwayFactory({
                description: 'pathway description',
                researchField: 'pathway research field',
                title: 'pathway title',
            });

            spyOn(PDIIPPinitPathwayInMemory, 'save');
            spyOn(inMemoryPathwayRepository, 'add');
            spyOn(inMemoryPathwayRepository, 'get');
        });

        test('should throw an error', (done) => {
            try {
                const result =
                    PDIIPPinitPathwayInMemory.save(PDSPBEpathwayEntity);

                result.subscribe({
                    next: () => {
                        done('Expected an error, but got a value');
                    },
                });
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as NotFoundException).message).toBe(
                    'Pathway not found in memory'
                );
                done();
            }
        });
    });
});
