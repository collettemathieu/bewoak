import type { CTSEBadRequestException, CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import type { PathwayPresenters } from '../../../../../../business/pathway/ports/presenters/pathway-presenter.port';

export class InitializedPathwayResponseBodyDto implements PathwayPresenters {
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
