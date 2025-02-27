import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { AsyncResult } from '@bewoak/common-types-result';
import type { PDSPBEPathwayEntity } from '../../../entities/pathway';

export interface PDSPBPInitializePathwayPersistence {
    save: (pDSPBEPathwayEntity: PDSPBEPathwayEntity) => AsyncResult<PDSPBEPathwayEntity, CTSEException>;
}

export const PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE = Symbol('PDSPBPInitializePathwayPersistence');
