import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPHttpPathwayPortOutput {
    description: string;
    id: string;
    researchField: string;
    title: string;
}
export interface PDSPBPHttpPathwayPort {
    present: (
        pDSPBEpathwayEntity: PDSPBEPathwayEntity
    ) => PDSPBPHttpPathwayPortOutput;
}

export const PDSPBP_HTTP_PATHWAY_PORT = Symbol('PDSPBPHttpPathwayPort');
