import type {
    PDSPBEPathwayEntity,
    PDSPBPPathwayPresenterPort,
} from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToJsonPathwayPresenter implements PDSPBPPathwayPresenterPort {
    present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description,
            id: pDSPBEPathwayEntity.id,
            researchField: pDSPBEPathwayEntity.researchField,
            title: pDSPBEPathwayEntity.title,
        };
    }
}
