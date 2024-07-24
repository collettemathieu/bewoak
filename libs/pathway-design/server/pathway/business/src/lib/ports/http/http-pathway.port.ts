import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPHttpPathwayPort {
    present: (pDSPBEpathwayEntity: PDSPBEPathwayEntity) => {
        description: string;
        id: string;
        researchField: string;
        title: string;
    };
}

export const PDSPBP_HTTP_PATHWAY_PORT = Symbol('PDSPBPHttpPathwayPort');
