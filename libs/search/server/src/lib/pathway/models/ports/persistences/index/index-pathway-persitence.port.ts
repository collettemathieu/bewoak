import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { AsyncResult } from '@bewoak/common-types-result';
import type { PathwayEntity } from '../../../entities/pathway';

export interface IndexPathwayPersistence {
    index: (pathwayEntity: PathwayEntity) => AsyncResult<PathwayEntity, CTSEException>;
}

export const INDEX_PATHWAY_PERSISTENCE = Symbol('IndexPathwayPersistence');
