import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { AsyncResult } from '@bewoak/common-types-result';
import type { PathwayEntity } from '../../../entities/pathway';

export interface ChangeTitlePathwayPersistence {
    changeTitle: (pathway: PathwayEntity) => AsyncResult<PathwayEntity, CTSEException>;
    getPathwayByPathwayId: (pathwayId: string) => AsyncResult<PathwayEntity, CTSEException>;
}

export const CHANGE_TITLE_PATHWAY_PERSISTENCE = Symbol('ChangeTitlePathwayPersistence');
