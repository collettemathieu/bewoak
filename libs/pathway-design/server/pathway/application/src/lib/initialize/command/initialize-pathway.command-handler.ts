import {
    type PDSPBPInitializePathwayPersistencePort,
    type PDSPBPToJsonPathwayPresenterPort,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
    PDSPBP_TO_JSON_PATHWAY_PRESENTER_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { Inject } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { PDSPBUInitializePathwayUsecase } from '@bewoak/pathway-design-server-pathway-business';
import { PDSPAInitializePathwayCommand } from './initialize-pathway.command';

@CommandHandler(PDSPAInitializePathwayCommand)
export class PDSPAInitializePathwayCommandHandler
    implements ICommandHandler<PDSPAInitializePathwayCommand>
{
    constructor(
        @Inject(PDSPBUInitializePathwayUsecase)
        private readonly pDSPBUInitializePathwayUsecase: PDSPBUInitializePathwayUsecase,
        @Inject(PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT)
        private readonly pDSPBPInitializePathwayPersistencePort: PDSPBPInitializePathwayPersistencePort,
        @Inject(PDSPBP_TO_JSON_PATHWAY_PRESENTER_PORT)
        private readonly pDSPBPToJsonPathwayPresenterPort: PDSPBPToJsonPathwayPresenterPort
    ) {}

    execute(pDSPAInitializePathwayCommand: PDSPAInitializePathwayCommand) {
        return this.pDSPBUInitializePathwayUsecase.execute(
            this.pDSPBPInitializePathwayPersistencePort,
            this.pDSPBPToJsonPathwayPresenterPort,
            {
                title: pDSPAInitializePathwayCommand.title,
                description: pDSPAInitializePathwayCommand.description,
                researchField: pDSPAInitializePathwayCommand.researchField,
            }
        );
    }
}
