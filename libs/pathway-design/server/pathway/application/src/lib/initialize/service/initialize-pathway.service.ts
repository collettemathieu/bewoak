import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { CommandBus } from '@nestjs/cqrs';
import type { PDSPAInitializePathwayCommand } from '../command/initialize-pathway.command';

@Injectable()
export class PDSPAInitializePathwayService {
    constructor(private readonly commandBus: CommandBus) {}

    init(pDSPAInitializePathwayCommand: PDSPAInitializePathwayCommand) {
        return this.commandBus.execute<PDSPAInitializePathwayCommand, PDSPBPPathwayPresenters>(pDSPAInitializePathwayCommand);
    }
}
