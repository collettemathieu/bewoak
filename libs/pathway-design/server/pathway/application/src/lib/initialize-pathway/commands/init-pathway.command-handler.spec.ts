import {
    type PDSPBEPathwayEntity,
    type PDSPBPHttpPathwayPort,
    type PDSPBPHttpPathwayPortOutput,
    type PDSPBPInitPathwayMemoryPort,
    PDSPBP_HTTP_PATHWAY_PORT,
    PDSPBP_INIT_PATHWAY_MEMORY_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { Test } from '@nestjs/testing';

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
class PathwayPresenter implements PDSPBPHttpPathwayPort {
    present(PDSPBEpathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: PDSPBEpathwayEntity.description?.value ?? '',
            id: PDSPBEpathwayEntity.id?.value ?? '',
            researchField: PDSPBEpathwayEntity.researchField?.value ?? '',
            title: PDSPBEpathwayEntity.title?.value ?? '',
        };
    }
}

describe('PDSPAInitPathwayCommandHandler', () => {
    let pDSPAInitPathwayCommandHandler: PDSPAInitPathwayCommandHandler;
    let PDSPBUinitPathwayUseCase: PDSPBUInitPathwayUsecase;
    let initPathwayMemory: PDSPBPInitPathwayMemoryPort;
    let pathwayPresenter: PDSPBPHttpPathwayPort;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                InitPathwayMemory,
                PDSPAInitPathwayCommandHandler,
                {
                    provide: PDSPBP_INIT_PATHWAY_MEMORY_PORT,
                    useExisting: InitPathwayMemory,
                },
                {
                    provide: PDSPBP_HTTP_PATHWAY_PORT,
                    useClass: PathwayPresenter,
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
        pathwayPresenter = module.get<PDSPBPHttpPathwayPort>(
            PDSPBP_HTTP_PATHWAY_PORT
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
        let result: Promise<PDSPBPHttpPathwayPortOutput>;

        beforeEach(async () => {
            spyOn(PDSPBUinitPathwayUseCase, 'execute');
            result = pDSPAInitPathwayCommandHandler.execute(command);
        });

        test('should call the usecase in order to initiate the pathway', async () => {
            expect(PDSPBUinitPathwayUseCase.execute).toHaveBeenCalledTimes(1);
            expect(PDSPBUinitPathwayUseCase.execute).toHaveBeenCalledWith(
                initPathwayMemory,
                pathwayPresenter,
                {
                    title: command.title,
                    description: command.description,
                    researchField: command.researchField,
                }
            );
        });

        test('should receive the attributes of the pathway', async (done) => {
            result.then((data) => {
                expect(data).toBeDefined();
                expect(data.title).toBe(command.title);
                expect(data.description).toBe(command.description);
                expect(data.researchField).toBe(command.researchField);
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
        let result: Promise<PDSPBPHttpPathwayPortOutput>;

        beforeEach(async () => {
            result = pDSPAInitPathwayCommandHandler.execute(command);
        });

        test('should receive a pathway with its correct attributes', async (done) => {
            result.then((data) => {
                expect(data).toBeDefined();
                expect(data.title).toBe(command.title);
                expect(data.description).toBe(command.description);
                expect(data.researchField).toBe(command.researchField);
                done();
            });
        });
    });
});
