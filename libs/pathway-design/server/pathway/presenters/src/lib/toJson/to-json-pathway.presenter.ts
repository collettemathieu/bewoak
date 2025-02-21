import type { PDSPBEPathwayEntity, PDSPBPPathwayPresenter } from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToJsonPathwayPresenter implements PDSPBPPathwayPresenter {
    error(message: string) {
        return {
            message,
        };
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
