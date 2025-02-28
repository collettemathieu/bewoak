import type { CTSEBadRequestException, CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class InitializedPathwayResponseBodyDto implements PDSPBPPathwayPresenters {
    description!: string;
    pathwayId!: string;
    researchField!: string;
    title!: string;
}

export class InitializedPathwayBadRequestExceptionBodyDto implements CTSEBadRequestException {
    errors!: Record<string, unknown>[];
    message!: string;
    name!: string;
    statusCode!: number;
}
export class InitializedPathwayInternalServerExceptionBodyDto implements CTSEInternalServerException {
    message!: string;
    name!: string;
    statusCode!: number;
}
