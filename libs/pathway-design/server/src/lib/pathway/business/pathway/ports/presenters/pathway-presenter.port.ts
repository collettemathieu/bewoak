import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { PathwayEntity } from '../../entities/pathway';

export interface PDSPBPJsonPathwayPresenter {
    description: string;
    pathwayId: string;
    researchField: string;
    title: string;
}

export type PathwayPresenters = PDSPBPJsonPathwayPresenter;
export type PDSPBPPathwayPresenterException = CTSEException;
export type PathwayPresenterResult = PathwayPresenters | PDSPBPPathwayPresenterException;

export interface PathwayPresenter {
    exception: (exception: CTSEException) => PDSPBPPathwayPresenterException;
    present: (pDSPBEpathwayEntity: PathwayEntity) => PathwayPresenters;
}

export const PATHWAY_PRESENTER = Symbol('PathwayPresenter');
