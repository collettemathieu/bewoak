import type {
    PDSPBEPathwayEntity,
    PDSPBPToJsonPathwayPresenterPort,
} from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToJsonPathwayPresenter
    implements PDSPBPToJsonPathwayPresenterPort
{
    present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description,
            id: pDSPBEPathwayEntity.id,
            researchField: pDSPBEPathwayEntity.researchField,
            title: pDSPBEPathwayEntity.title,
        };
    }
}
