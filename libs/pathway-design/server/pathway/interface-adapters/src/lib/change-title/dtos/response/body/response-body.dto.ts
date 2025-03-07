import type {
    CTSEBadRequestException,
    CTSEInternalServerException,
    CTSENotFoundRequestException,
} from '@bewoak/common-http-exceptions-server';
import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class ChangeTitlePathwayResponseBodyDto implements PDSPBPPathwayPresenters {
    description!: string;
    pathwayId!: string;
    researchField!: string;
    title!: string;
}

export class ChangeTitlePathwayBadRequestExceptionBodyDto implements CTSEBadRequestException {
    errors!: Record<string, unknown>[];
    message!: string;
    name!: string;
    statusCode!: number;
}
export class ChangeTitlePathwayInternalServerExceptionBodyDto implements CTSEInternalServerException {
    message!: string;
    name!: string;
    statusCode!: number;
}
export class ChangeTitlePathwayNotFoundExceptionBodyDto implements CTSENotFoundRequestException {
    message!: string;
    name!: string;
    statusCode!: number;
}
