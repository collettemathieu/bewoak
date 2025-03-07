import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { AsyncResult } from '@bewoak/common-types-result';
import type { PDSPBEPathwayEntity } from '../../../entities/pathway';

export interface PDSPBPChangeTitlePathwayPersistence {
    changeTitle: (pathwayId: string, title: string) => AsyncResult<PDSPBEPathwayEntity, CTSEException>;
}

export const PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE = Symbol('PDSPBPChangeTitlePathwayPersistence');
