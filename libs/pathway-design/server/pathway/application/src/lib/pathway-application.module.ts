import { Module } from '@nestjs/common';

import { InitPathwayCommandHandler } from './initialize-pathway/commands/index.command-handler';
import { InitPathwayService } from './initialize-pathway/services/index.service';

@Module({
    controllers: [],
    providers: [InitPathwayCommandHandler, InitPathwayService],
})
export class PathwayDesignServerPathwayApplicationModule {}
