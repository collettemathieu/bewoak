import {
    type PDSPBPChangeTitlePathwayPersistencePort,
    type PDSPBPPathwayPresenterPort,
    PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT,
    PDSPBP_PATHWAY_PRESENTER_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { Inject } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { CommandHandler, EventPublisher, type ICommandHandler } from '@nestjs/cqrs';

// biome-ignore lint/style/useImportType: <explanation>
import { PDSPACUChangeTitlePathwayUseCase } from '../usecase/change-title-pathway.usecase';
import { PDSPAChangeTitlePathwayCommand } from './change-title-pathway.command';

@CommandHandler(PDSPAChangeTitlePathwayCommand)
export class PDSPAChangeTitlePathwayCommandHandler implements ICommandHandler<PDSPAChangeTitlePathwayCommand> {
    constructor(
        private readonly pDSPACUChangeTitlePathwayUseCase: PDSPACUChangeTitlePathwayUseCase,
        @Inject(PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT)
        private readonly pDSPBPChangeTitlePathwayPersistencePort: PDSPBPChangeTitlePathwayPersistencePort,
        @Inject(PDSPBP_PATHWAY_PRESENTER_PORT)
        private readonly pDSPBPPathwayPresenterPort: PDSPBPPathwayPresenterPort,
        private readonly eventPublisher: EventPublisher
    ) {}

    execute(pDSPAChangeTitlePathwayCommand: PDSPAChangeTitlePathwayCommand) {
        return this.pDSPACUChangeTitlePathwayUseCase.execute(
            this.pDSPBPChangeTitlePathwayPersistencePort,
            this.pDSPBPPathwayPresenterPort,
            this.eventPublisher,
            {
                pathwayId: pDSPAChangeTitlePathwayCommand.pathwayId, // Il faut changer le nom de la propriété pathway en pathwayId
                title: pDSPAChangeTitlePathwayCommand.title,
            }
        );
    }
}
