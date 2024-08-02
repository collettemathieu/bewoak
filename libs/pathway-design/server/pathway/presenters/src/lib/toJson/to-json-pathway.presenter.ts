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
            description: pDSPBEPathwayEntity.description?.value ?? '',
            id: pDSPBEPathwayEntity.id?.value ?? '',
            researchField: pDSPBEPathwayEntity.researchField?.value ?? '',
            title: pDSPBEPathwayEntity.title?.value ?? '',
        };
    }
}
