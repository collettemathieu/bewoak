import {
    type PDSPBPInitializePathwayPersistencePort,
    type PDSPBPPathwayPresenterPort,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
    PDSPBP_PATHWAY_PRESENTER_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { Inject } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { CommandHandler, EventPublisher, type ICommandHandler } from '@nestjs/cqrs';

// biome-ignore lint/style/useImportType: <explanation>
import { PDSPAIUInitializePathwayUsecase } from '../usecase/initialize-pathway.usecase';
import { PDSPAInitializePathwayCommand } from './initialize-pathway.command';

@CommandHandler(PDSPAInitializePathwayCommand)
export class PDSPAInitializePathwayCommandHandler implements ICommandHandler<PDSPAInitializePathwayCommand> {
    constructor(
        private readonly pDSPAIUInitializePathwayUsecase: PDSPAIUInitializePathwayUsecase,
        @Inject(PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT)
        private readonly pDSPBPInitializePathwayPersistencePort: PDSPBPInitializePathwayPersistencePort,
        @Inject(PDSPBP_PATHWAY_PRESENTER_PORT)
        private readonly pDSPBPPathwayPresenterPort: PDSPBPPathwayPresenterPort,
        private readonly eventPublisher: EventPublisher
    ) {}

    execute(pDSPAInitializePathwayCommand: PDSPAInitializePathwayCommand) {
        return this.pDSPAIUInitializePathwayUsecase.execute(
            this.pDSPBPInitializePathwayPersistencePort,
            this.pDSPBPPathwayPresenterPort,
            this.eventPublisher,
            {
                title: pDSPAInitializePathwayCommand.title,
                description: pDSPAInitializePathwayCommand.description,
                researchField: pDSPAInitializePathwayCommand.researchField,
            }
        );
    }
}
