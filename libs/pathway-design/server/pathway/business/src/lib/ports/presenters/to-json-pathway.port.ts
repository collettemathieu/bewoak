import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPToJsonPathwayPresenterPortOutput {
    description: string;
    id: string;
    researchField: string;
    title: string;
}
export interface PDSPBPToJsonPathwayPresenterPort {
    present: (
        pDSPBEpathwayEntity: PDSPBEPathwayEntity
    ) => PDSPBPToJsonPathwayPresenterPortOutput;
}

export const PDSPBP_TO_JSON_PATHWAY_PRESENTER_PORT = Symbol(
    'PDSPBPToJsonPathwayPresenterPort'
);
