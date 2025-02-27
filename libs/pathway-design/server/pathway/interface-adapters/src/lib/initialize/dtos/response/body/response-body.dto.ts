import type { CTSEBadRequestException, CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class InitializedPathwayResponseBodyDto implements PDSPBPPathwayPresenters {
    description!: string;
    pathwayId!: string;
    researchField!: string;
    title!: string;
}

export class InitializedPathwayBadRequestExceptionBodyDto implements CTSEBadRequestException {
    message!: string;
    name = 'BadRequestException' as const;
    statusCode = 400;
}
export class InitializedPathwayInternalServerExceptionBodyDto implements CTSEInternalServerException {
    message!: string;
    name = 'InternalServerException' as const;
    statusCode = 500;
}
