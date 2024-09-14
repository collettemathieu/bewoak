import type { PDSPBEPathwayEntity } from '../../../entities/pathway';

export interface PDSPBPInitializePathwayPersistencePort {
    save: (pDSPBEPathwayEntity: PDSPBEPathwayEntity) => Promise<PDSPBEPathwayEntity>;
}

export const PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT = Symbol('PDSPBPInitializePathwayPersistencePort');
