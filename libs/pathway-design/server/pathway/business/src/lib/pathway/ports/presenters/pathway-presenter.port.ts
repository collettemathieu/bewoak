import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPJsonPathwayPresenter {
    description: string;
    pathwayId: string;
    researchField: string;
    title: string;
}

export type PDSPBPPathwayPresenters = PDSPBPJsonPathwayPresenter;
export type PDSPBPPathwayPresenterException = CTSEException;
export type PDSPBPPathwayPresenterResult = PDSPBPPathwayPresenters | PDSPBPPathwayPresenterException;

export interface PDSPBPPathwayPresenter {
    exception: (exception: CTSEException) => PDSPBPPathwayPresenterException;
    present: (pDSPBEpathwayEntity: PDSPBEPathwayEntity) => PDSPBPPathwayPresenters;
}

export const PDSPBP_PATHWAY_PRESENTER = Symbol('PDSPBPPathwayPresenter');
