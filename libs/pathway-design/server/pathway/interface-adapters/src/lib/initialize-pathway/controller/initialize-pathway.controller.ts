import {
    PDSPAInitPathwayCommand,
    PDSPAInitializePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import {
    type PDSPBPHttpPathwayPort,
    PDSPBP_HTTP_PATHWAY_PORT,
} from '@bewoak/pathway-design-server-pathway-business';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { InitializePathwayRequestBodyDto } from '../dtos/request/body/initialize-pathway.dto';

@Controller('pathway')
export class InitializePathwayController {
    constructor(
        @Inject(PDSPAInitializePathwayService)
        private readonly pDSPAInitializePathwayService: PDSPAInitializePathwayService,
        @Inject(PDSPBP_HTTP_PATHWAY_PORT)
        private readonly pDSPBPHttpPathwayPort: PDSPBPHttpPathwayPort
    ) {}

    @Post('init')
    async execute(
        @Body() initializePathwayRequestBodyDto: InitializePathwayRequestBodyDto
    ) {
        const pathway = await this.pDSPAInitializePathwayService.init(
            new PDSPAInitPathwayCommand(
                initializePathwayRequestBodyDto.description,
                initializePathwayRequestBodyDto.researchField,
                initializePathwayRequestBodyDto.title
            )
        );

        return this.pDSPBPHttpPathwayPort.present(pathway);
    }
}
