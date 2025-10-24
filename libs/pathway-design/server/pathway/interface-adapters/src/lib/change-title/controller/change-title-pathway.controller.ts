// biome-ignore lint/style/useImportType: <To be explained>
import {
    PDSPAChangeTitlePathwayCommand,
    PDSPAChangeTitlePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import { Body, Controller, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// biome-ignore lint/style/useImportType: <To be explained>
import { ChangeTitlePathwayRequestBodyDto } from '../dtos/request/body/request-body.dto';
// biome-ignore lint/style/useImportType: <To be explained>
import { ChangeTitlePathwayRequestParamsDto } from '../dtos/request/params/request-params.dto';
import {
    ChangeTitlePathwayBadRequestExceptionBodyDto,
    ChangeTitlePathwayNotFoundExceptionBodyDto,
    ChangeTitlePathwayResponseBodyDto,
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
export class ChangeTitlePathwayController {
    constructor(private readonly pDSPAChangeTitlePathwayService: PDSPAChangeTitlePathwayService) {}

    @Patch('change-title/:pathwayId')
    @ApiOkResponse({
        description: 'Title of the pathway changed.',
        type: ChangeTitlePathwayResponseBodyDto,
    })
    @ApiBadRequestResponse({
        description: 'Cannot change the title of the pathway. Data are not valid.',
        type: ChangeTitlePathwayBadRequestExceptionBodyDto,
    })
    @ApiNotFoundResponse({
        description: 'Cannot change the title of the pathway. Pathway not found.',
        type: ChangeTitlePathwayNotFoundExceptionBodyDto,
    })
    execute(
        @Param() changeTitlePathwayRequestParamsDto: ChangeTitlePathwayRequestParamsDto,
        @Body() changeTitlePathwayRequestBodyDto: ChangeTitlePathwayRequestBodyDto
    ) {
        return this.pDSPAChangeTitlePathwayService.execute(
            new PDSPAChangeTitlePathwayCommand(
                changeTitlePathwayRequestParamsDto.pathwayId,
                changeTitlePathwayRequestBodyDto.title
            )
        );
    }
}
