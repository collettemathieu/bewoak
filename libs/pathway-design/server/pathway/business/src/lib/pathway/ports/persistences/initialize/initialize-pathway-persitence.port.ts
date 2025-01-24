import type { PDSPBEPathwayEntity } from '../../../entities/pathway';

export interface PDSPBPInitializePathwayPersistence {
    save: (pDSPBEPathwayEntity: PDSPBEPathwayEntity) => Promise<PDSPBEPathwayEntity>;
}

export const PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE = Symbol('PDSPBPInitializePathwayPersistence');
