// biome-ignore lint/style/useImportType: <explanation>
import {
    PDSPAChangeTitlePathwayCommand,
    PDSPAChangeTitlePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import { Body, Controller, HttpStatus, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// biome-ignore lint/style/useImportType: <explanation>
import { ChangeTitlePathwayRequestBodyDto } from '../dtos/request/body/request-body.dto';
// biome-ignore lint/style/useImportType: <explanation>
import { ChangeTitlePathwayRequestParamsDto } from '../dtos/request/params/request-params.dto';
import { ChangeTitlePathwayResponseBodyDto } from '../dtos/response/body/response-body.dto';

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
export class ChangeTitlePathwayController {
    constructor(private readonly pDSPAChangeTitlePathwayService: PDSPAChangeTitlePathwayService) {}

    @Patch('change-title/:pathwayId')
    @ApiOkResponse({
        description: 'Title of the pathway changed.',
        type: ChangeTitlePathwayResponseBodyDto,
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Cannot change the title of the pathway. Data are not valid.',
    })
    execute(
        @Param() changeTitlePathwayRequestParamsDto: ChangeTitlePathwayRequestParamsDto,
        @Body() changeTitlePathwayRequestBodyDto: ChangeTitlePathwayRequestBodyDto
    ): Promise<ChangeTitlePathwayResponseBodyDto> {
        return this.pDSPAChangeTitlePathwayService.execute(
            new PDSPAChangeTitlePathwayCommand(
                changeTitlePathwayRequestParamsDto.pathwayId,
                changeTitlePathwayRequestBodyDto.title
            )
        );
    }
}
