import {
    type PDSPBPHttpPathwayPort,
    type PDSPBPInitPathwayMemoryPort,
    PDSPBP_HTTP_PATHWAY_PORT,
    PDSPBP_INIT_PATHWAY_MEMORY_PORT,
} from '@bewoak/pathway-design-server-pathway-business';

import { Inject } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { PDSPBUInitPathwayUsecase } from '@bewoak/pathway-design-server-pathway-business';
import { firstValueFrom } from 'rxjs';
import { PDSPAInitPathwayCommand } from './init-pathway.command';

@CommandHandler(PDSPAInitPathwayCommand)
export class PDSPAInitPathwayCommandHandler
    implements ICommandHandler<PDSPAInitPathwayCommand>
{
    constructor(
        @Inject(PDSPBUInitPathwayUsecase)
        private readonly PDSPBUinitPathwayUseCase: PDSPBUInitPathwayUsecase,
        @Inject(PDSPBP_INIT_PATHWAY_MEMORY_PORT)
        private readonly PDSPBPinitPathwayMemoryPort: PDSPBPInitPathwayMemoryPort,
        @Inject(PDSPBP_HTTP_PATHWAY_PORT)
        private readonly pDSPBPHttpPathwayPort: PDSPBPHttpPathwayPort
    ) {}

    execute(pDSPAInitPathwayCommand: PDSPAInitPathwayCommand) {
        return firstValueFrom(
            this.PDSPBUinitPathwayUseCase.execute(
                this.PDSPBPinitPathwayMemoryPort,
                this.pDSPBPHttpPathwayPort,
                {
                    title: pDSPAInitPathwayCommand.title,
                    description: pDSPAInitPathwayCommand.description,
                    researchField: pDSPAInitPathwayCommand.researchField,
                }
            )
        );
    }
}
