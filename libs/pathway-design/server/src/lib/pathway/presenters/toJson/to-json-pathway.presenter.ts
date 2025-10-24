import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import { Injectable } from '@nestjs/common';
import type { PathwayEntity } from '../../business/pathway/entities/pathway';
import type { PathwayPresenter } from '../../business/pathway/ports/presenters/pathway-presenter.port';

@Injectable()
export class ToJsonPathwayPresenter implements PathwayPresenter {
    exception(exception: CTSEException) {
        return exception;
    }

    present(pDSPBEPathwayEntity: PathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description,
            pathwayId: pDSPBEPathwayEntity.pathwayId,
            researchField: pDSPBEPathwayEntity.researchField,
            title: pDSPBEPathwayEntity.title,
        };
    }
}
