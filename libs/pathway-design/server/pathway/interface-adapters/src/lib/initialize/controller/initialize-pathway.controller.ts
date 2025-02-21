// biome-ignore lint/style/useImportType: <explanation>
import { PDSPAInitializePathwayCommand, PDSPAInitializePathwayService } from '@bewoak/pathway-design-server-pathway-application';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
// biome-ignore lint/style/useImportType: <explanation>
import { InitializePathwayRequestBodyDto } from '../dtos/request/body/request-body.dto';
import {
    InitializedPathwayResponseBodyErrorDto,
    InitializedPathwayResponseBodySuccessDto,
} from '../dtos/response/body/response-body.dto';

@ApiTags('Pathway')
@UsePipes(
    new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    })
)
@Controller({
    path: 'pathway',
})
export class InitializePathwayController {
    constructor(private readonly pDSPAInitializePathwayService: PDSPAInitializePathwayService) {}

    @Post('initialize')
    @ApiCreatedResponse({
        description: 'Pathway initialized.',
        type: InitializedPathwayResponseBodySuccessDto,
    })
    @ApiBadRequestResponse({
        description: 'Cannot initiate pathway. Data are not valid.',
        type: InitializedPathwayResponseBodyErrorDto,
    })
    execute(
        @Body() initializePathwayRequestBodyDto: InitializePathwayRequestBodyDto
    ): Promise<InitializedPathwayResponseBodySuccessDto | InitializedPathwayResponseBodyErrorDto> {
        return this.pDSPAInitializePathwayService.initialize(
            new PDSPAInitializePathwayCommand(
                initializePathwayRequestBodyDto.description,
                initializePathwayRequestBodyDto.researchField,
                initializePathwayRequestBodyDto.title
            )
        );
    }
}
