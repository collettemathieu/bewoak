import type { AsyncResult } from '@bewoak/common-tools-types-result';
import type { PDSPBEPathwayEntity } from '../../../entities/pathway';

export interface PDSPBPInitializePathwayPersistence {
    save: (pDSPBEPathwayEntity: PDSPBEPathwayEntity) => AsyncResult<PDSPBEPathwayEntity, string>;
}

export const PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE = Symbol('PDSPBPInitializePathwayPersistence');
