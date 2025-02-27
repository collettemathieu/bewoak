import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { PDSPBEPathwayEntity, PDSPBPPathwayPresenter } from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToJsonPathwayPresenter implements PDSPBPPathwayPresenter {
    exception(exception: CTSEException) {
        return exception;
    }

    present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description,
            pathwayId: pDSPBEPathwayEntity.pathwayId,
            researchField: pDSPBEPathwayEntity.researchField,
            title: pDSPBEPathwayEntity.title,
        };
    }
}
