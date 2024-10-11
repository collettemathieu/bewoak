// biome-ignore lint/style/useImportType: <explanation>
import { PDSPAInitializePathwayCommand, PDSPA_InitializePathwayService } from '@bewoak/pathway-design-server-pathway-application';
import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
// biome-ignore lint/style/useImportType: <explanation>
import { InitializePathwayRequestBodyDto } from '../dtos/request/body/request-body.dto';
import { InitializedPathwayResponseBodyDto } from '../dtos/response/body/response-body.dto';

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
    constructor(private readonly pDSPAInitializePathwayService: PDSPA_InitializePathwayService) {}

    @Post('init')
    @ApiCreatedResponse({
        description: 'Pathway initialized.',
        type: InitializedPathwayResponseBodyDto,
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Cannot initiate pathway. Data are not valid.',
    })
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
