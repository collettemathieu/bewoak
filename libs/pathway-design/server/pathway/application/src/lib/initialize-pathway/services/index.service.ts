import type { PathwayDesignServerPathwayBusinessEntitiesPathway } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { InitPathwayCommand } from '../commands/index.command';

@Injectable()
export class InitPathwayService {
    constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    init(initPathwayCommand: InitPathwayCommand) {
        return this.commandBus.execute<
            InitPathwayCommand,
            PathwayDesignServerPathwayBusinessEntitiesPathway
        >(initPathwayCommand);
    }
}
