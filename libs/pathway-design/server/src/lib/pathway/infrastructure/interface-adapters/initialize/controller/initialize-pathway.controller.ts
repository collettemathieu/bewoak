import { TraceSpan } from '@bewoak/common-o11y-server';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { InitializePathwayCommand } from '../../../../application/initialize/command/initialize-pathway.command';
// biome-ignore lint/style/useImportType: <Not applicable>
import { InitializePathwayService } from '../../../../application/initialize/service/initialize-pathway.service';
// biome-ignore lint/style/useImportType: <To be explained>
import { InitializePathwayRequestBodyDto } from '../dtos/request/body/request-body.dto';
import {
    InitializedPathwayBadRequestExceptionBodyDto,
    InitializedPathwayInternalServerExceptionBodyDto,
    InitializedPathwayResponseBodyDto,
} from '../dtos/response/body/response-body.dto';

@ApiTags('Pathway')
@UsePipes(
    new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
    })
)
@Controller({
    path: 'pathway',
})
export class InitializePathwayController {
    constructor(private readonly initializePathwayService: InitializePathwayService) {}

    @Post('initialize')
    @ApiCreatedResponse({
        description: 'Pathway initialized.',
        type: InitializedPathwayResponseBodyDto,
    })
    @ApiBadRequestResponse({
        description: 'Cannot initiate pathway. Data are not valid.',
        type: InitializedPathwayBadRequestExceptionBodyDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Cannot initiate pathway. Internal server exception occured.',
        type: InitializedPathwayInternalServerExceptionBodyDto,
    })
    @TraceSpan()
    execute(@Body() initializePathwayRequestBodyDto: InitializePathwayRequestBodyDto) {
        return this.initializePathwayService.initialize(
            new InitializePathwayCommand(
                initializePathwayRequestBodyDto.description,
                initializePathwayRequestBodyDto.researchField,
                initializePathwayRequestBodyDto.title
            )
        );
    }
}
