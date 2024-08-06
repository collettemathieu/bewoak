import {
    PDSPAInitializePathwayCommand,
    PDSPAInitializePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import {
    Body,
    Controller,
    Inject,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import type { InitializePathwayRequestBodyDto } from '../dtos/request/body/index.dto';
import type { InitializedPathwayResponseBodyDto } from '../dtos/response/body/index.dto';

@UsePipes(new ValidationPipe())
@Controller({
    path: 'pathway',
})
export class InitializePathwayController {
    constructor(
        @Inject(PDSPAInitializePathwayService)
        private readonly pDSPAInitializePathwayService: PDSPAInitializePathwayService
    ) {}

    @Post('init')
    execute(
        @Body() initializePathwayRequestBodyDto: InitializePathwayRequestBodyDto
    ): Promise<InitializedPathwayResponseBodyDto> {
        return this.pDSPAInitializePathwayService.init(
            new PDSPAInitializePathwayCommand(
                initializePathwayRequestBodyDto.description,
                initializePathwayRequestBodyDto.researchField,
                initializePathwayRequestBodyDto.title
            )
        );
    }
}
