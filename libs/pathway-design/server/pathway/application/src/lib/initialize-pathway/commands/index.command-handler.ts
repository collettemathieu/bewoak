import {
    PATHWAY_DESIGN_SERVER_PATHWAY_BUSINESS_PORTS_INIT_PATHWAY_MEMORY,
    type PathwayDesignServerPathwayBusinessPortsInitPathwayMemory,
} from '@bewoak/pathway-design-server-pathway-business';

import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { PathwayDesignServerPathwayBusinessUsecasesInitPathway } from '@bewoak/pathway-design-server-pathway-business';
import { InitPathwayCommand } from './index.command';

@CommandHandler(InitPathwayCommand)
export class InitPathwayCommandHandler {
    constructor(
        @Inject(PathwayDesignServerPathwayBusinessUsecasesInitPathway)
        private readonly pathwayDesignServerPathwayBusinessUsecasesInitPathway: PathwayDesignServerPathwayBusinessUsecasesInitPathway,
        @Inject(
            PATHWAY_DESIGN_SERVER_PATHWAY_BUSINESS_PORTS_INIT_PATHWAY_MEMORY
        )
        private readonly pathwayDesignServerPathwayBusinessPortsInitPathwayMemory: PathwayDesignServerPathwayBusinessPortsInitPathwayMemory
    ) {}

    execute(command: InitPathwayCommand) {
        return this.pathwayDesignServerPathwayBusinessUsecasesInitPathway.execute(
            this.pathwayDesignServerPathwayBusinessPortsInitPathwayMemory,
            {
                title: command.title,
                description: command.description,
                researchField: command.researchField,
            }
        );
    }
}
