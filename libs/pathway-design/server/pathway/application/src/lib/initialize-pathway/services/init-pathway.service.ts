import type { PDSPBEPathwayEntity } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { PDSPAInitPathwayCommand } from '../commands/init-pathway.command';

@Injectable()
export class PDSPAInitializePathwayService {
    constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    init(pDSPAInitPathwayCommand: PDSPAInitPathwayCommand) {
        return this.commandBus.execute<
            PDSPAInitPathwayCommand,
            PDSPBEPathwayEntity
        >(pDSPAInitPathwayCommand);
    }
}
