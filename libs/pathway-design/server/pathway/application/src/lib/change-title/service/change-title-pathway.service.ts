import type { PDSPBPPathwayPresenterResult } from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { CommandBus } from '@nestjs/cqrs';
import type { PDSPAChangeTitlePathwayCommand } from '../command/change-title-pathway.command';

@Injectable()
export class PDSPAChangeTitlePathwayService {
    constructor(private readonly commandBus: CommandBus) {}

    execute(pDSPAChangeTitlePathwayCommand: PDSPAChangeTitlePathwayCommand) {
        return this.commandBus.execute<PDSPAChangeTitlePathwayCommand, PDSPBPPathwayPresenterResult>(
            pDSPAChangeTitlePathwayCommand
        );
    }
}
