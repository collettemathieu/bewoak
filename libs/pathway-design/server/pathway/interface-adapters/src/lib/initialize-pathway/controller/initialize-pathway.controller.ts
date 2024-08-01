import {
    PDSPAInitPathwayCommand,
    PDSPAInitializePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { InitializePathwayRequestBodyDto } from '../dtos/request/body/initialize-pathway.dto';

@Controller('pathway')
export class InitializePathwayController {
    constructor(
        @Inject(PDSPAInitializePathwayService)
        private readonly pDSPAInitializePathwayService: PDSPAInitializePathwayService
    ) {}

    @Post('init')
    execute(
        @Body() initializePathwayRequestBodyDto: InitializePathwayRequestBodyDto
    ) {
        return this.pDSPAInitializePathwayService.init(
            new PDSPAInitPathwayCommand(
                initializePathwayRequestBodyDto.description,
                initializePathwayRequestBodyDto.researchField,
                initializePathwayRequestBodyDto.title
            )
        );
    }
}
