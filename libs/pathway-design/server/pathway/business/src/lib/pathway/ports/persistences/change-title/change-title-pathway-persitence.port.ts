import type { PDSPBEPathwayEntity } from '../../../entities/pathway';

export interface PDSPBPChangeTitlePathwayPersistence {
    changeTitle: (pathwayId: string, title: string) => Promise<PDSPBEPathwayEntity>;
}

export const PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE = Symbol('PDSPBPChangeTitlePathwayPersistence');
