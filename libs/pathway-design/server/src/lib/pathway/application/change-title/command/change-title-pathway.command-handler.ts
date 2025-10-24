import { Inject } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <To be explained>
import { CommandHandler, EventPublisher, type ICommandHandler } from '@nestjs/cqrs';
import {
    CHANGE_TITLE_PATHWAY_PERSISTENCE,
    type ChangeTitlePathwayPersistence,
} from '../../../business/pathway/ports/persistences/change-title/change-title-pathway-persitence.port';
import { PATHWAY_PRESENTER, type PathwayPresenter } from '../../../business/pathway/ports/presenters/pathway-presenter.port';
// biome-ignore lint/style/useImportType: <To be explained>
import { ChangeTitlePathwayUseCase } from '../usecase/change-title-pathway.usecase';
import { ChangeTitlePathwayCommand } from './change-title-pathway.command';

@CommandHandler(ChangeTitlePathwayCommand)
export class ChangeTitlePathwayCommandHandler implements ICommandHandler<ChangeTitlePathwayCommand> {
    constructor(
        private readonly changeTitlePathwayUseCase: ChangeTitlePathwayUseCase,
        @Inject(CHANGE_TITLE_PATHWAY_PERSISTENCE)
        private readonly changeTitlePathwayPersistence: ChangeTitlePathwayPersistence,
        @Inject(PATHWAY_PRESENTER)
        private readonly pathwayPresenter: PathwayPresenter,
        private readonly eventPublisher: EventPublisher
    ) {}

    execute(changeTitlePathwayCommand: ChangeTitlePathwayCommand) {
        return this.changeTitlePathwayUseCase.execute(
            this.changeTitlePathwayPersistence,
            this.pathwayPresenter,
            this.eventPublisher,
            {
                pathwayId: changeTitlePathwayCommand.pathwayId,
                title: changeTitlePathwayCommand.title,
            }
        );
    }
}
