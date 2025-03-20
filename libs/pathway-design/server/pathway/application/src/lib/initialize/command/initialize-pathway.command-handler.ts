import {
    type PDSPBPInitializePathwayPersistence,
    type PDSPBPPathwayPresenter,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE,
    PDSPBP_PATHWAY_PRESENTER,
} from '@bewoak/pathway-design-server-pathway-business';

import { Inject } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { CommandHandler, EventPublisher, type ICommandHandler } from '@nestjs/cqrs';

import { SpanOtel } from '@bewoak/common-configs-server-otel';
// biome-ignore lint/style/useImportType: <explanation>
import { PDSPAIUInitializePathwayUsecase } from '../usecase/initialize-pathway.usecase';
import { PDSPAInitializePathwayCommand } from './initialize-pathway.command';

@CommandHandler(PDSPAInitializePathwayCommand)
export class PDSPAInitializePathwayCommandHandler implements ICommandHandler<PDSPAInitializePathwayCommand> {
    constructor(
        private readonly pDSPAIUInitializePathwayUsecase: PDSPAIUInitializePathwayUsecase,
        @Inject(PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE)
        private readonly pDSPBPInitializePathwayPersistence: PDSPBPInitializePathwayPersistence,
        @Inject(PDSPBP_PATHWAY_PRESENTER)
        private readonly pDSPBPPathwayPresenter: PDSPBPPathwayPresenter,
        private readonly eventPublisher: EventPublisher
    ) {}

    @SpanOtel()
    execute(pDSPAInitializePathwayCommand: PDSPAInitializePathwayCommand) {
        return this.pDSPAIUInitializePathwayUsecase.execute(
            this.pDSPBPInitializePathwayPersistence,
            this.pDSPBPPathwayPresenter,
            this.eventPublisher,
            {
                title: pDSPAInitializePathwayCommand.title,
                description: pDSPAInitializePathwayCommand.description,
                researchField: pDSPAInitializePathwayCommand.researchField,
            }
        );
    }
}
