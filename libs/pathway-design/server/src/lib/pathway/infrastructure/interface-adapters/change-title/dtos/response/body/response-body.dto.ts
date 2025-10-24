import type { CTSEBadRequestException, CTSENotFoundRequestException } from '@bewoak/common-http-exceptions-server';
import type { PathwayPresenters } from '../../../../../../business/pathway/ports/presenters/pathway-presenter.port';

export class ChangeTitlePathwayResponseBodyDto implements PathwayPresenters {
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

export class ChangeTitlePathwayNotFoundExceptionBodyDto implements CTSENotFoundRequestException {
    message!: string;
    name!: string;
    statusCode!: number;
}
