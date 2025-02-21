import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPJsonPathwayPresenter {
    description: string;
    pathwayId: string;
    researchField: string;
    title: string;
}

export type PDSPBPPathwayPresenters = PDSPBPJsonPathwayPresenter;
export type PDSPBPPathwayPresenterError = {
    message: string;
};
export type PDSPBPPathwayPresenterResult = PDSPBPPathwayPresenters | PDSPBPPathwayPresenterError;

export interface PDSPBPPathwayPresenter {
    error: (message: string) => PDSPBPPathwayPresenterError;
    present: (pDSPBEpathwayEntity: PDSPBEPathwayEntity) => PDSPBPPathwayPresenters;
}

export const PDSPBP_PATHWAY_PRESENTER = Symbol('PDSPBPPathwayPresenter');
