import { TraceSpan } from '@bewoak/common-o11y-server';
import { Inject } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <To be explained>
import { CommandHandler, EventPublisher, type ICommandHandler } from '@nestjs/cqrs';
import {
    INITIALIZE_PATHWAY_PERSISTENCE,
    type InitializePathwayPersistence,
} from '../../../business/pathway/ports/persistences/initialize/initialize-pathway-persitence.port';
import { PATHWAY_PRESENTER, type PathwayPresenter } from '../../../business/pathway/ports/presenters/pathway-presenter.port';
// biome-ignore lint/style/useImportType: <To be explained>
import { InitializePathwayUsecase } from '../usecase/initialize-pathway.usecase';
import { InitializePathwayCommand } from './initialize-pathway.command';

@CommandHandler(InitializePathwayCommand)
export class InitializePathwayCommandHandler implements ICommandHandler<InitializePathwayCommand> {
    constructor(
        private readonly initializePathwayUsecase: InitializePathwayUsecase,
        @Inject(INITIALIZE_PATHWAY_PERSISTENCE)
        private readonly initializePathwayPersistence: InitializePathwayPersistence,
        @Inject(PATHWAY_PRESENTER)
        private readonly pathwayPresenter: PathwayPresenter,
        private readonly eventPublisher: EventPublisher
    ) {}

    @TraceSpan()
    execute(initializePathwayCommand: InitializePathwayCommand) {
        return this.initializePathwayUsecase.execute(
            this.initializePathwayPersistence,
            this.pathwayPresenter,
            this.eventPublisher,
            {
                description: initializePathwayCommand.description,
                researchField: initializePathwayCommand.researchField,
                title: initializePathwayCommand.title,
            }
        );
    }
}
