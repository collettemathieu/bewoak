import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPJsonPathwayPresenter {
    description: string;
    id: string;
    researchField: string;
    title: string;
}

export type PDSPBPPathwayPresenter = PDSPBPJsonPathwayPresenter;

export interface PDSPBPPathwayPresenterPort {
    present: (
        pDSPBEpathwayEntity: PDSPBEPathwayEntity
    ) => PDSPBPPathwayPresenter;
}

export const PDSPBP_PATHWAY_PRESENTER_PORT = Symbol(
    'PDSPBPPathwayPresenterPort'
);
