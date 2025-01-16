import type { PDSPBEPathwayEntity } from '../../../entities/pathway.entity';

export interface PDSPBPChangeTitlePathwayPersistencePort {
    changeTitle: (pathwayId: string, title: string) => Promise<PDSPBEPathwayEntity>;
}

export const PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT = Symbol('PDSPBPChangeTitlePathwayPersistencePort');
