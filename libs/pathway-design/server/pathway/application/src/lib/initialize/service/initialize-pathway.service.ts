import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { PDSPAInitializePathwayCommand } from '../command/initialize-pathway.command';

@Injectable()
export class PDSPAInitializePathwayService {
    constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    init(pDSPAInitializePathwayCommand: PDSPAInitializePathwayCommand) {
        return this.commandBus.execute<
            PDSPAInitializePathwayCommand,
            PDSPBPPathwayPresenters
        >(pDSPAInitializePathwayCommand);
    }
}
