import {
    type PDSPBEPathwayEntity,
    type PDSPBPInitializePathwayPersistencePort,
    type PDSPBPToJsonPathwayPresenterPort,
    type PDSPBPToJsonPathwayPresenterPortOutput,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
    PDSPBP_TO_JSON_PATHWAY_PRESENTER_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, spyOn, test } from 'bun:test';

import { PDSPBUInitializePathwayUsecase } from '@bewoak/pathway-design-server-pathway-business';
import { PDSPAInitializePathwayCommand } from './initialize-pathway.command';
import { PDSPAInitializePathwayCommandHandler } from './initialize-pathway.command-handler';

class InitializePathwayPersistence
    implements PDSPBPInitializePathwayPersistencePort
{
    save(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return Promise.resolve(pDSPBEPathwayEntity);
    }
}
class ToJsonPathwayPresenter implements PDSPBPToJsonPathwayPresenterPort {
    present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description?.value ?? '',
            id: pDSPBEPathwayEntity.id?.value ?? '',
            researchField: pDSPBEPathwayEntity.researchField?.value ?? '',
            title: pDSPBEPathwayEntity.title?.value ?? '',
        };
    }
}

describe('PDSPAInitializePathwayCommandHandler', () => {
    let pDSPAInitializePathwayCommandHandler: PDSPAInitializePathwayCommandHandler;
    let pDSPBUInitializePathwayUsecase: PDSPBUInitializePathwayUsecase;
    let initializePathwayPersistence: PDSPBPInitializePathwayPersistencePort;
    let toJsonPathwayPresenter: PDSPBPToJsonPathwayPresenterPort;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                InitializePathwayPersistence,
                PDSPAInitializePathwayCommandHandler,
                {
                    provide: PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
                    useExisting: InitializePathwayPersistence,
                },
                {
                    provide: PDSPBP_TO_JSON_PATHWAY_PRESENTER_PORT,
                    useClass: ToJsonPathwayPresenter,
                },
                PDSPBUInitializePathwayUsecase,
            ],
        }).compile();

        pDSPAInitializePathwayCommandHandler =
            module.get<PDSPAInitializePathwayCommandHandler>(
                PDSPAInitializePathwayCommandHandler
            );
        pDSPBUInitializePathwayUsecase =
            module.get<PDSPBUInitializePathwayUsecase>(
                PDSPBUInitializePathwayUsecase
            );
        initializePathwayPersistence =
            module.get<PDSPBPInitializePathwayPersistencePort>(
                PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT
            );
        toJsonPathwayPresenter = module.get<PDSPBPToJsonPathwayPresenterPort>(
            PDSPBP_TO_JSON_PATHWAY_PRESENTER_PORT
        );
    });

    test('should be defined', () => {
        expect(pDSPAInitializePathwayCommandHandler).toBeDefined();
    });

    describe('I want to initialize a pathway from a command', () => {
        const command = new PDSPAInitializePathwayCommand(
            'pathway description',
            'research field',
            'pathway title'
        );
        let result: PDSPBPToJsonPathwayPresenterPortOutput;

        beforeEach(async () => {
            spyOn(pDSPBUInitializePathwayUsecase, 'execute');
            result =
                await pDSPAInitializePathwayCommandHandler.execute(command);
        });

        test('should call the usecase in order to initiate the pathway', () => {
            expect(
                pDSPBUInitializePathwayUsecase.execute
            ).toHaveBeenCalledTimes(1);
            expect(pDSPBUInitializePathwayUsecase.execute).toHaveBeenCalledWith(
                initializePathwayPersistence,
                toJsonPathwayPresenter,
                {
                    title: command.title,
                    description: command.description,
                    researchField: command.researchField,
                }
            );
        });

        test('should receive the attributes of the pathway', () => {
            expect(result).toBeDefined();
            expect(result.title).toBe(command.title);
            expect(result.description).toBe(command.description);
            expect(result.researchField).toBe(command.researchField);
        });
    });

    describe('I want to initialize a pathway from another command', () => {
        const command = new PDSPAInitializePathwayCommand(
            'My pathway description',
            'pharmacology',
            'My pathway'
        );
        let result: PDSPBPToJsonPathwayPresenterPortOutput;

        beforeEach(async () => {
            result =
                await pDSPAInitializePathwayCommandHandler.execute(command);
        });

        test('should receive a pathway with its correct attributes', () => {
            expect(result).toBeDefined();
            expect(result.title).toBe(command.title);
            expect(result.description).toBe(command.description);
            expect(result.researchField).toBe(command.researchField);
        });
    });
});
