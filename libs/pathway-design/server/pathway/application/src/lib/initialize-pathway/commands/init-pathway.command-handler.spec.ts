import {
    PDSPBEPathwayEntity,
    type PDSPBPInitPathwayMemoryPort,
    PDSPBP_INIT_PATHWAY_MEMORY_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, spyOn, test } from 'bun:test';

import { PDSPBUInitPathwayUsecase } from '@bewoak/pathway-design-server-pathway-business';
import { type Observable, of } from 'rxjs';
import { PDSPAInitPathwayCommand } from './init-pathway.command';
import { PDSPAInitPathwayCommandHandler } from './init-pathway.command-handler';

class InitPathwayMemory implements PDSPBPInitPathwayMemoryPort {
    save(
        PDSPBEpathwayEntity: PDSPBEPathwayEntity
    ): Observable<PDSPBEPathwayEntity> {
        return of(PDSPBEpathwayEntity);
    }
}

describe('PDSPAInitPathwayCommandHandler', () => {
    let pDSPAInitPathwayCommandHandler: PDSPAInitPathwayCommandHandler;
    let PDSPBUinitPathwayUseCase: PDSPBUInitPathwayUsecase;
    let initPathwayMemory: PDSPBPInitPathwayMemoryPort;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                InitPathwayMemory,
                PDSPAInitPathwayCommandHandler,
                {
                    provide: PDSPBP_INIT_PATHWAY_MEMORY_PORT,
                    useExisting: InitPathwayMemory,
                },
                PDSPBUInitPathwayUsecase,
            ],
        }).compile();

        pDSPAInitPathwayCommandHandler =
            module.get<PDSPAInitPathwayCommandHandler>(
                PDSPAInitPathwayCommandHandler
            );
        PDSPBUinitPathwayUseCase = module.get<PDSPBUInitPathwayUsecase>(
            PDSPBUInitPathwayUsecase
        );
        initPathwayMemory = module.get<PDSPBPInitPathwayMemoryPort>(
            PDSPBP_INIT_PATHWAY_MEMORY_PORT
        );
    });

    test('should be defined', () => {
        expect(pDSPAInitPathwayCommandHandler).toBeDefined();
    });

    describe('I want to initialize a pathway from a command', () => {
        const command = new PDSPAInitPathwayCommand(
            'pathway description',
            'research field',
            'pathway title'
        );
        let result: Promise<PDSPBEPathwayEntity>;

        beforeEach(async () => {
            spyOn(PDSPBUinitPathwayUseCase, 'execute');
            result = pDSPAInitPathwayCommandHandler.execute(command);
        });

        test('should call the usecase in order to initiate the pathway', async () => {
            expect(PDSPBUinitPathwayUseCase.execute).toHaveBeenCalledTimes(1);
            expect(PDSPBUinitPathwayUseCase.execute).toHaveBeenCalledWith(
                initPathwayMemory,
                {
                    title: command.title,
                    description: command.description,
                    researchField: command.researchField,
                }
            );
        });

        test('should return a pathway', async (done) => {
            expect(result).toBeDefined();
            result.then((pathway) => {
                expect(pathway).toBeInstanceOf(PDSPBEPathwayEntity);
                done();
            });
        });

        test('should return a pathway with the correct data', async (done) => {
            result.then((pathway) => {
                expect(
                    pathway.equals({
                        description: pathway.description?.value ?? '',
                        researchField: pathway.researchField?.value ?? '',
                        title: pathway.title?.value ?? '',
                    })
                ).toBe(true);
                done();
            });
        });
    });

    describe('I want to initialize a pathway from another command', () => {
        const command = new PDSPAInitPathwayCommand(
            'My pathway description',
            'pharmacology',
            'My pathway'
        );
        let result: Promise<PDSPBEPathwayEntity>;

        beforeEach(async () => {
            result = pDSPAInitPathwayCommandHandler.execute(command);
        });

        test('should return a pathway with the correct data', async (done) => {
            result.then((pathway) => {
                expect(
                    pathway.equals({
                        description: pathway.description?.value ?? '',
                        researchField: pathway.researchField?.value ?? '',
                        title: pathway.title?.value ?? '',
                    })
                ).toBe(true);
                done();
            });
        });
    });
});
