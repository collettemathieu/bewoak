import {
    PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE,
    PDSPBP_PATHWAY_PRESENTER,
    type PDSPBPChangeTitlePathwayPersistence,
    type PDSPBPPathwayPresenter,
} from '@bewoak/pathway-design-server-pathway-business';
import { Inject } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <To be explained>
import { CommandHandler, EventPublisher, type ICommandHandler } from '@nestjs/cqrs';
// biome-ignore lint/style/useImportType: <To be explained>
import { PDSPACUChangeTitlePathwayUseCase } from '../usecase/change-title-pathway.usecase';
import { PDSPAChangeTitlePathwayCommand } from './change-title-pathway.command';

@CommandHandler(PDSPAChangeTitlePathwayCommand)
export class PDSPAChangeTitlePathwayCommandHandler implements ICommandHandler<PDSPAChangeTitlePathwayCommand> {
    constructor(
        private readonly pDSPACUChangeTitlePathwayUseCase: PDSPACUChangeTitlePathwayUseCase,
        @Inject(PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE)
        private readonly pDSPBPChangeTitlePathwayPersistence: PDSPBPChangeTitlePathwayPersistence,
        @Inject(PDSPBP_PATHWAY_PRESENTER)
        private readonly pDSPBPPathwayPresenter: PDSPBPPathwayPresenter,
        private readonly eventPublisher: EventPublisher
    ) {}

    execute(pDSPAChangeTitlePathwayCommand: PDSPAChangeTitlePathwayCommand) {
        return this.pDSPACUChangeTitlePathwayUseCase.execute(
            this.pDSPBPChangeTitlePathwayPersistence,
            this.pDSPBPPathwayPresenter,
            this.eventPublisher,
            {
                pathwayId: pDSPAChangeTitlePathwayCommand.pathwayId, // Il faut changer le nom de la propriété pathway en pathwayId
                title: pDSPAChangeTitlePathwayCommand.title,
            }
        );
    }
}
