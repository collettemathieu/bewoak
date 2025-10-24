import { TraceSpan } from '@bewoak/common-o11y-server';
import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <Need for the dependency injection>
import { CommandBus } from '@nestjs/cqrs';
import type { PathwayPresenterResult } from '../../../business/pathway/ports/presenters/pathway-presenter.port';
import type { InitializePathwayCommand } from '../command/initialize-pathway.command';

@Injectable()
export class InitializePathwayService {
    constructor(private readonly commandBus: CommandBus) {}

    @TraceSpan()
    initialize(initializePathwayCommand: InitializePathwayCommand) {
        return this.commandBus.execute<InitializePathwayCommand, PathwayPresenterResult>(initializePathwayCommand);
    }
}
