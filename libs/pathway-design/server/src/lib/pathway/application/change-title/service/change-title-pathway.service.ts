import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <To be explained>
import { CommandBus } from '@nestjs/cqrs';
import type { PathwayPresenterResult } from '../../../business/pathway/ports/presenters/pathway-presenter.port';
import type { ChangeTitlePathwayCommand } from '../command/change-title-pathway.command';

@Injectable()
export class ChangeTitlePathwayService {
    constructor(private readonly commandBus: CommandBus) {}

    execute(changeTitlePathwayCommand: ChangeTitlePathwayCommand) {
        return this.commandBus.execute<ChangeTitlePathwayCommand, PathwayPresenterResult>(changeTitlePathwayCommand);
    }
}
